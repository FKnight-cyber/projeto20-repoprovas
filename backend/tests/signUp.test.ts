import app from '../src/app';
import supertest from 'supertest';
import prisma from '../src/database/prisma';

describe('POST /sign-up', () => {
    it('returns 422 when sending invalid user object', async () => {
        const failUser = {
            email: "aaaaa", //invalid email format
            password: "1234" //not sending confirmPass
        };

        const result = await supertest(app).post('/sign-up').send(failUser);

        expect(result.status).toBe(422);
    });

    it("returns 422 when confirmPass doesn't match password!", async () => {
        const failUser = {
            email: "fulanodetal@gmail.com",
            password: "1234",
            confirmPass: "12345"
        };

        const result = await supertest(app).post('/sign-up').send(failUser);

        expect(result.status).toBe(422);
    });

    it("returns 401 when the email was already registered!", async () => {

        const user3 = {
            email: "fulanodetal3@gmail.com",
            password: "1234",
            confirmPass: "1234"
        };
        
        await supertest(app).post('/sign-up').send(user3);

        const result = await supertest(app).post('/sign-up').send(user3);

        expect(result.status).toBe(401);
    });

    it('returns 201 when successfully register an user', async () => {

        const user = {
            email: "fulanodetal2@gmail.com",
            password: "1234",
            confirmPass: "1234"
        };

        await prisma.$executeRaw`TRUNCATE TABLE "Users"`;

        const result = await supertest(app).post('/sign-up').send(user);

        console.log(result)

        expect(result.status).toBe(201);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});