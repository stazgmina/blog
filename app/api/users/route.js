import { NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'
import bcrypt from 'bcrypt'

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