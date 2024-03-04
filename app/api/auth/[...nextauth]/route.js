import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 5 * 60
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'E-mail',
          type: 'text',
          placeholder: 'email'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '********'
        }
      },
      async authorize(credentials) {
        try {
          const foundUser = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          })

          if (foundUser) {
            console.log('User exists')
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password
            )

            if (match) {
              console.log('password correct')
              delete foundUser.password
              return foundUser
            } 
          }
          return null
        } catch (error) {
          console.log(error)
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if(user){
        console.log(`USER: ${JSON.stringify(user)}`)
      }

      return token
    },
    session: ({ session, token, user }) => {
      if(token) {
        console.log(`SESSION: ${JSON.stringify(token)}`)
      }

      return session
    }
  }
})

export { handler as GET, handler as POST }
