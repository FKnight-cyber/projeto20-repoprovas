import app from "../src/app";
import supertest from "supertest";
import prisma from "../src/database/prisma";
import { login } from "./testUtils";

const test = {
    name: "Prova 5",
    pdfUrl: "https://www.doraci.com.br/downloads/matematica/fund-mat-elem_01.pdf",
    categoryId: 1,
    teacherDisciplineId: 4
  };

const user = {
    email: "fulanodetal@gmail.com",
    password: "1234",
    confirmPass: "1234"
};

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "Tests"`;
});

describe('POST /test/new', () => {
    it("returns 500 when header x-access-token isn't declared", async () => {
        await supertest(app).post('/test/new').send(test);

        const result =  await supertest(app).post('/test/new').send(test);

        expect(result.status).toBe(500);
    });

    it("returns 401 when authorization token isn't sent", async () => {
        await supertest(app).post('/test/new').send(test);
        const token = '';

        const result = await supertest(app).post('/test/new')
        .set('x-access-token',token)
        .send(test);

        expect(result.status).toBe(401);
    });

    it("returns 422 when sent invalid test object", async () => {
        const { text:token } = await login(user);

        const invalidTest = {
            name: "Prova 5", //must be a string
            pdfUrl: "https://www.doraci.com.br/downloads/matematica/fund-mat-elem_01.pdf", //pdf url must be a valid pdf url
            categoryId: "1", //must be a number
            teacherDisciplineId: "4" //must be a number
          };

        const result = await supertest(app).post('/test/new')
        .set('x-access-token',token)
        .send(invalidTest);

        expect(result.status).toBe(422);
    });

    it("returns 401 when there's a test registered with same Name", async () => {
        const { text:token } = await login(user);
       
        await supertest(app).post('/test/new')
        .set('x-access-token',token)
        .send(test);

        const result =  await supertest(app).post('/test/new')
        .set('x-access-token',token)
        .send(test);

        expect(result.status).toBe(401);
    });

    it("returns 404 if categoryId doesn't match any registered category", async () => {
        const { text:token } = await login(user);

        const invalidCategoryTest = {
            name: "Prova 5",
            pdfUrl: "https://www.doraci.com.br/downloads/matematica/fund-mat-elem_01.pdf",
            categoryId: 900,
            teacherDisciplineId: 4
          };

        const result =  await supertest(app).post('/test/new')
        .set('x-access-token',token)
        .send(invalidCategoryTest);

        expect(result.status).toBe(404);
    });

    it("returns 404 if teacherDisciplineId doesn't match any registered discipline", async () => {
        const { text:token } = await login(user);

        const invalidDisciplineTest = {
            name: "Prova 5",
            pdfUrl: "https://www.doraci.com.br/downloads/matematica/fund-mat-elem_01.pdf",
            categoryId: 1,
            teacherDisciplineId: 900
          };

        const result =  await supertest(app).post('/test/new')
        .set('x-access-token',token)
        .send(invalidDisciplineTest);

        expect(result.status).toBe(404);
    });

    it("returns 201 when successfully register a new test!", async () => {
        const { text:token } = await login(user);

        const result =  await supertest(app).post('/test/new')
        .set('x-access-token',token)
        .send(test);

        expect(result.status).toBe(201);
    });
});


afterAll(async () => {
    await prisma.$disconnect();
});