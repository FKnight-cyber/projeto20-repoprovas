import prisma from "../database/prisma";
import { TestData } from "../types/testType";

export async function addTest(test:TestData){
    await prisma.tests.create({data:test});
}

export async function findTestByName(name:string) {
    return prisma.tests.findUnique({where:{name}});
}