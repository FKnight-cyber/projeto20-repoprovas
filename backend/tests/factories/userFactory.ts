import { faker } from '@faker-js/faker';

export function __userFactory(){
    const password = faker.internet.password();
    return  {
        email: faker.internet.email(),
        password,
        confirmPass: password
    }
};