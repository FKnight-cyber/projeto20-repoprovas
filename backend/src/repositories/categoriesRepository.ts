import prisma from "../database/prisma";

export async function findCategoryById(id:number){
    return prisma.categories.findUnique({where:{id}});
}