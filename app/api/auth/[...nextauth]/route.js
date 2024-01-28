import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const handler = NextAuth({
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
        } catch (error) {
          console.log(error)
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.username = user.username
      }
      return token
    },
    async session(session, token) {
      return session
    }
  }
})

export { handler as GET, handler as POST }
