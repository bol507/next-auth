import NextAuth from "next-auth"
import authConfig from "@/auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
 
import { prisma } from "@/lib/db"
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user}){
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date()
        },
      })
    }
  },
  callbacks: {
    async signIn({ user, account}) {
      console.log({user, account})  ;
      
      if(account?.provider !== "credentials") return true;
      
      const existingUser = await getUserById(user.id as string);
      
      if(!existingUser?.emailVerified) return false;
      if(existingUser.isTwoFactorEnabled){
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
        
        if(!twoFactorConfirmation) return false
        //Delete two factor confirmation next login
        await prisma.twoFactorConfirmation.delete({
          where: {
            userId: existingUser.id,
          },
        })
      }

      return true
    },
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