import NextAuth from "next-auth"
import authConfig from "@/auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
 
import { prisma } from "@/lib/db"
 
export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if(session?.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token }) {
      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})