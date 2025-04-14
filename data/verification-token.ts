import { prisma } from '@/lib/db'

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const tokenRecord = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    })

    return tokenRecord
  }
  catch {
    return null
  }
}

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const tokenRecord = await prisma.verificationToken.findFirst({
      where: {
        email,
      },
    })

    return tokenRecord
  }
  catch {
    return null
  }
}