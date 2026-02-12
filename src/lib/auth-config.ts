import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './db'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
    }),
  ],
  session: {
    strategy: 'database',
  },
  pages: {
    signIn: '/login',
  },
  events: {
    async createUser({ user }) {
      // 신규 사용자 가입 시 UserData 레코드 자동 생성
      if (user.id) {
        await prisma.userData.create({
          data: {
            userId: user.id,
          },
        })
      }
    },
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        session.user.role = (user as { role?: string }).role as 'USER' | 'ADMIN' | 'RESEARCHER' ?? 'USER'
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { termsAgreedAt: true, parentalConsentAt: true },
          })
          session.user.termsAgreed = !!dbUser?.termsAgreedAt
          session.user.parentalConsent = !!dbUser?.parentalConsentAt
        } catch {
          // DB 조회 실패 시 기본값 (모달이 뜨도록 false)
          session.user.termsAgreed = false
          session.user.parentalConsent = false
        }
      }
      return session
    },
  },
})
