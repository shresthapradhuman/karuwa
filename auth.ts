import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from './prisma/client'
import authConfig from './auth.config'
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true
      const existingUser = await prisma.user.findUnique({
        where: { id: user.id }
      })
      if (!existingUser?.emailVerified) return false
      return true
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (session.user) {
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.isOAuth = token.isOAuth as boolean
      }
      return session
    },
    async jwt({ token }) {
      if (!token) return token
      const existingUser = await prisma.user.findUnique({
        where: { id: token.sub! }
      })
      if (!existingUser) return token
      const existingAccount = await prisma.account.findFirst({
        where: { userId: existingUser.id }
      })
      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      return token
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig
})
