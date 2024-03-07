import prisma from '@/prisma/prisma'
import sharp from 'sharp'

import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'


export const getPosts = async () => {
    const posts = await prisma.post.findMany({
        include:{
            author: {
                select: {
                    name: true,
                    image: true
                }
            }
        }
    })
    return posts
}

export async function GET(req){

}

export async function POST(req){
    try {
        const formData = await req.formData()

        // assign data to variables
        const title = formData.get('title');
        const description = formData.get('description');
        const content = formData.get('content');
        const category = (formData.get('category'));
        const image = formData.get('image');
        const authorId = parseInt(formData.get('authorId'));
        const published = formData.get('published') === "true";

        // get image buffer
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const resizedImageBuffer = await sharp(buffer).resize(300, 200).toBuffer()
        const resizedBigImageBuffer = await sharp(buffer).resize(1200, 800).toBuffer()

        //assign id to imge file name
        const randomId = Math.random().toString(36).substring(2, 5)
        const newFileName = `[${randomId}]${image.name}`
        const newBigFileName = `[${randomId}]${image.name}_Big`

        // some according comment
        const imagePath = join(process.cwd(), 'public', 'images', newFileName);
        const imageBigPath = join(process.cwd(), 'public', 'images', 'big', newFileName);

        await writeFile(imagePath, resizedImageBuffer);
        await writeFile(imageBigPath, resizedBigImageBuffer);

        const filePath = `/images/${newFileName}`;
        const fileBigPath = `/images/big/${newBigFileName}`;

        const post = await prisma.post.create({
            data:{
                title,
                description,
                content,
                category,
                image: filePath,
                imageBig: fileBigPath,
                author: { connect: { id: authorId } },
                published
            }
        })

        return NextResponse.json(
            { message: 'success', postData: post }, 
            { status: 200 }
        );
    } catch (error) {
        console.error('Error:', error);

        return NextResponse.json(
            { message: error }, 
            { status: 500 }
        );
    }
}
