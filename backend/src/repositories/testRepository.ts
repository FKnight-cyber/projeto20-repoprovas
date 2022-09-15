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
            disciplines:{
                select:{
                    name:true
                }
            },
            Tests:{
                select:{
                    id:true,
                    name:true,
                    pdfUrl:true
                }
            },
            teachers:true
        }
    })
}

export async function findTestByTeacherId(id:number){
    return prisma.teachers.findMany({
        where:{
            id:id
        },
        include:{
            TeachersDisciplines:{
                include:{
                    disciplines:{
                        select:{
                            name:true
                        }
                    },
                    Tests:{
                        select:{
                            id:true,
                            name:true,
                            pdfUrl:true
                        }
                    }
                }
            }
        }
    });
}