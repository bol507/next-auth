import { prisma } from "@/lib/db";
import { RegisterSchema } from "@/schemas";

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    return user;
} 

export const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });
    return user;
}

export const createUser = async (user: RegisterSchema) => {
    const newUser = await prisma.user.create({
        data: user
    });
    return newUser;
}