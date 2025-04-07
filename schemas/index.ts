import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    })
})

export type RegisterSchema = z.infer<typeof RegisterSchema>
export type LoginSchema = z.infer<typeof LoginSchema>
