
import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"

import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = await LoginSchema.safeParse(credentials)
        if (!validatedFields.success) {
        
          return null; 
        }

        const {email, password} = validatedFields.data
        const user = await getUserByEmail(email)
        if (!user || !user.password) return null
          
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (passwordMatch) {
          
          return user; 
        } else {
          
          return null; 
        }
       
      },
    }),    
  ],
} satisfies NextAuthConfig