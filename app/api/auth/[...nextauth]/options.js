import { PrismaClient } from '@prisma/client'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const prisma = new PrismaClient()

export const options = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'E-mail',
                    type: 'text',
                    placeholder: 'your-email'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'your-password'
                }
            },   
            async authorize(credentials){
                try{
                    const foundUser = await Prisma.user.findUnique({
                        where: {
                            email: credentials.email
                        }
                    })

                    if(foundUser){
                        console.log('User exists')
                        const match = await bcrypt.compare(
                            credentials.password,
                            foundUser.password
                        )

                        if(match){
                            console.log('password correct')
                            delete foundUser.password
                            return foundUser
                        }
                    }
                }catch(error){
                    console.log(error)
                }
                return null
            }
        })
    ],
}


//https://www.youtube.com/watch?v=w2h54xz6Ndw