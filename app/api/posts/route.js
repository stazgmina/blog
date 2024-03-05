import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { writeFile } from 'fs/promises'
import { join } from 'path'

const prisma = new PrismaClient()

export async function POST(req){
    try {
        const { title, description, content, authorId , image , category, published } = await req.formData();

        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const randomId = Math.random().toString(36).substring(2, 5)
        const newFileName = `[${randomId}]${image.name}`

        const imagePath = join(process.cwd(), 'public', newFileName);
        await writeFile(imagePath, buffer);

        const filePath = `/public/${newFileName}`;

        const post = await prisma.post.create({
            data:{
                title: title,
                desc: description,
                content: content,
                image: filePath,
                published: published,
                // ... continue from here
            
            }
        })

        return NextResponse.json(
            { message: 'success' }, 
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
