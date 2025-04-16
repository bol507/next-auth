import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string ) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<h1>Confirm your email</h1><p>Click the link to confirm your email address</p><a href="${confirmLink}">to confirm email.</a>`,
  });
}

export const sendPasswordResetEmail = async (email: string, token: string ) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<h1>Reset your password</h1><p>Click the link to reset your password</p><a href="${resetLink}">to reset password.</a>`,
  });
}