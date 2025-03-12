import { NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'
import bcrypt from 'bcrypt'
import sharp from 'sharp'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function GET(req){
    const { userId } = await req.json()

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(user){
        delete user.password
        return NextResponse.json(
            { user: user }, 
            { status: 200 }
        )
    } else return NextResponse.json(
        { message: 'user not found' }, 
        { status: 404 }
    )
}

export async function POST(req){
    try{
        const body = await req.json()
        const userData = body.formData

        // Validation
        if(!userData?.email || !userData.password || !userData.name){
            return NextResponse.json(
                { message: "Please fill in all fields" },
                { status: 400 }
            )
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(userData.email)) {
            return NextResponse.json(
                { message: "Please enter a valid email address" },
                { status: 400 }
            )
        }

        // Password strength validation
        if (userData.password.length < 6) {
            return NextResponse.json(
                { message: "Password must be at least 6 characters long" },
                { status: 400 }
            )
        }

        const duplicate = await prisma.user.findFirst({
            where: {
                email: userData.email
            }
        })

        if(duplicate) return NextResponse.json(
            { message: "This email is already registered" },
            { status: 409 }
        )

        const hashPassword = await bcrypt.hash(userData.password, 10)
        userData.password = hashPassword

        await prisma.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                password: userData.password,
            }
        })

        return NextResponse.json(
            { message: 'user created'},
            { status: 201 }
        )
    }catch(err){
        console.error('Registration error:', err)
        return NextResponse.json(
            { message: "An error occurred during registration. Please try again." },
            { status: 500 }
        )
    }
}

export async function PUT(req) {
    try {
        const formData = await req.formData()
        const userId = parseInt(formData.get('userId'))
        const name = formData.get('name')
        const image = formData.get('image')

        let updateData = {}

        if (name) {
            // Check if name is already taken
            const existingUser = await prisma.user.findFirst({
                where: {
                    name,
                    NOT: {
                        id: userId
                    }
                }
            })
            
            if (existingUser) {
                return NextResponse.json(
                    { message: "Username already taken" },
                    { status: 400 }
                )
            }
            
            updateData.name = name
        }

        if (image) {
            const bytes = await image.arrayBuffer()
            const buffer = Buffer.from(bytes)
            
            const resizedImageBuffer = await sharp(buffer)
                .resize(200, 200, { fit: 'cover' })
                .toBuffer()

            const randomId = Math.random().toString(36).substring(2, 5)
            const newFileName = `avatar_${randomId}_${image.name}`
            
            const imagePath = join(process.cwd(), 'public', 'avatars', newFileName)
            await writeFile(imagePath, resizedImageBuffer)
            
            updateData.image = `/avatars/${newFileName}`
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData
        })

        delete updatedUser.password
        
        return NextResponse.json(
            { message: 'Profile updated successfully', user: updatedUser },
            { status: 200 }
        )
    } catch (error) {
        console.error('Update error:', error)
        return NextResponse.json(
            { message: "Error updating profile" },
            { status: 500 }
        )
    }
}