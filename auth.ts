import NextAuth from "next-auth"
import authConfig from "@/auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
 
import { prisma } from "@/lib/db"
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"
 
export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if(session.user && token.sub) {
        session.user.id = token.sub
      }
      if(token.role && session?.user) {
        session.user.role = token.role as UserRole
      }
      return session
    },
    async jwt({ token }) {
      if(!token.sub) return token
      const existingUser = await getUserById(token.sub)
      if(!existingUser) return token
      token.role = existingUser.role
      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})