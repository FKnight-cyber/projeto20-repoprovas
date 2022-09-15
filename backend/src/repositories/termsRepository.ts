import prisma from "../database/prisma";

export async function getAllTerms(){
    return await prisma.terms.findMany();
}