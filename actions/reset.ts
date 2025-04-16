"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";

export const reset = async ( values: ResetSchema ) => {
  const validatedFields = await ResetSchema.safeParse(values);
  if ( !validatedFields.success ) {
    return { error: "Invalid email" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if ( !existingUser ) {
    return { error: "Invalid email" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(email, passwordResetToken.token);

  return { success: "Reset email sent" };
}