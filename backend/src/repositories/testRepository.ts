import prisma from "../database/prisma";
import { TestData } from "../types/testType";

export async function addTest(test:TestData){
    await prisma.tests.create({data:test});
}

export async function findTestByName(name:string) {
    return prisma.tests.findUnique({where:{name}});
}

export async function findTestByDisciplineId(){
    return prisma.terms.findMany({
            include:{
                Disciplines:{
                    include:{
                        TeachersDisciplines:{
                            include:{
                                Tests:{
                                    include:{
                                        categories:{
                                            select:{
                                                name:true
                                            }
                                        }
                                    }
                                },
                                teachers:true
                            }
                        }
                    }
                }
            }
        }
    );
}

export async function findTestByTeacherId(){
    return prisma.teachersDisciplines.findMany({
        include:{
            Tests:{
                select:{
                    name:true,
                    pdfUrl:true
                }
            },
            disciplines:{
                include:{
                    terms:{
                        select:{
                            number:true
                        }
                    }
                }
            },
            teachers:{
                select:{
                    name:true
                }
            },
        }});
}