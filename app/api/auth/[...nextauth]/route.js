import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/prisma/prisma'
import bcrypt from 'bcrypt'

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60
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
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.image = user.image
        console.log(`token 1: ${JSON.stringify(token)}`)
      }

      return token
    },
    session: ({ session, token, user }) => {
      if(token) {
        console.log(`token 2: ${JSON.stringify(token)}`)
        console.log(`SESSION: ${JSON.stringify(session)}`)
        session.user.id = token.id
      }

      return session
    }
  }
})

export { handler as GET, handler as POST }
