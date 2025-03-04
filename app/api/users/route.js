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

        if(!userData?.email || !userData.password){
            return NextResponse.json(
                { message: "all fields are required" },
                { status: 400 }
            )
        }

        const duplicate = await prisma.user.findFirst({
            where: {
                email: userData.email
            }
        })

        if(duplicate) return NextResponse.json(
            { message: "user with this email already exists"},
            { status: 400 }
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
        console.log(err)
        return NextResponse.json(
            { message: "Error", err },
            { status: 500 }
        )
    }
}