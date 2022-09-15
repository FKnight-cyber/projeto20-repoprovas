import { faker } from '@faker-js/faker';

export function __testFactory(){
    return {
        name: faker.word.noun(),
        pdfUrl: faker.internet.avatar() + '.pdf',
        categoryId: 1,
        teacherDisciplineId: 1
    }
}