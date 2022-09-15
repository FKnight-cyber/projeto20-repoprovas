import prisma from "../database/prisma";
import { TestData } from "../types/testType";

export async function addTest(test:TestData){
    await prisma.tests.create({data:test});
}

export async function findTestByName(name:string) {
    return prisma.tests.findUnique({where:{name}});
}

export async function findTestByDisciplineId(id:number){
    return prisma.teachersDisciplines.findMany({
        where:{
            disciplineId:id
        },include:{
            Tests:true,
            teachers:true
        }
    })
}

export async function findTestByTeacherId(id:number){
    return prisma.teachers.findMany({
        include:{
            TeachersDisciplines:{
                include:{
                    disciplines:true,
                    Tests:true
                }
            }
        }
    });
}