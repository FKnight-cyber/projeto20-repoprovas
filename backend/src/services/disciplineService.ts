import * as disciplineMethods from "../repositories/disciplineRepository";

export async function getDisciplinesByTermId(id:number){
    const disciplines = await disciplineMethods.getByTermId(id);

    return disciplines;
}