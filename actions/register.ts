"use server";

import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "@/data/user";
import { RegisterSchema } from "@/schemas";


export const register = async (values: RegisterSchema) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if(!validatedFields.success){
        return { error: "Invalid fields!"}
    }

    const { email, password, name } = validatedFields.data;
    
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return { error: "Somthing went wrong!" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({email, password: hashedPassword, name});

    //TODO: send verification email

    return { success: "User created successfully!" };
}

