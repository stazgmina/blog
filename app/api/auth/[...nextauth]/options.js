import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const options = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'email',
                    type: 'text',
                    placeholder: 'your-email'
                },
                password: {
                    label: 'password',
                    type: 'password',
                    placeholder: 'your-password'
                }
            },
            async authorize(credentials){
                try{
                    const foundUser = await prisma.user.findUnique({
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
                    }

                    // if(match){
                    //     console.log('Password correct')
                    //     delete foundUser.password
                    // } WILL HAVE TO WATCH TEH YOUTUBE VIDEO
                }catch(err){

                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if(user) token.role = user.role
            return token
        },
        async session({session, token}){
            if(session?.user) session.user.role = token.role
            return session
        }
    }
}