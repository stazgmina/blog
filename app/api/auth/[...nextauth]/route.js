import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/prisma/prisma'
import bcrypt from 'bcrypt'

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60
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
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please fill in all fields')
        }

        try {
          const foundUser = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          })

          if (!foundUser) {
            throw new Error('No account found with this email')
          }

          const match = await bcrypt.compare(
            credentials.password,
            foundUser.password
          )

          if (!match) {
            throw new Error('Invalid password')
          }

          delete foundUser.password
          return foundUser
        } catch (error) {
          console.error('Authentication error:', error)
          throw new Error(error.message || 'Authentication failed')
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if(user){
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.image = user.image
        token.likedPosts = user.likedPosts
      }
      return token
    },
    session: ({ session, token }) => {
      if(token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.image
        session.user.likedPosts = token.likedPosts
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
