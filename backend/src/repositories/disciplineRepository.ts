import prisma from "../database/prisma";

export async function findTeacherDisciplineById(id:number){
    return prisma.teachersDisciplines.findUnique({where:{id}});
};

export async function getByTermId(id:number){
    return prisma.disciplines.findMany({where:{termId:id}});
};