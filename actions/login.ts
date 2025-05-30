"use server";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { prisma } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";


export const login = async (values: LoginSchema) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password || !existingUser.email) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(existingUser.email, verificationToken.token);
    return { success: "confirmation email sent" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {

    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) return { error: "Invalid code!" };
      if (twoFactorToken.token !== code) return { error: "Invalid code!" };
      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) return { error: "Code expired!" };

      await prisma.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      })
      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
      if (existingConfirmation) {

        await prisma.twoFactorConfirmation.delete({
          where: {
            userId: existingUser.id,
          },
        })
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      })

      //return { success: "2FA code confirmed" };
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
