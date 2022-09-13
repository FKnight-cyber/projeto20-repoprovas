import prisma from "../database/prisma";
import { UserData } from "../types/authTypes";

export async function findUserByEmail(email:string) {
    return await prisma.users.findUnique({where: {email}});
};

export async function signUp(user:UserData) {
    await prisma.users.create({data: user});
};