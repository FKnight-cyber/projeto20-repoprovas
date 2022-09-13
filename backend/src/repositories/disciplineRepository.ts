import prisma from "../database/prisma";

export async function findTeacherDisciplineById(id:number){
    return prisma.teachersDisciplines.findUnique({where:{id}});
}