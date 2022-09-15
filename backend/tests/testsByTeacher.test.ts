import app from "../src/app";
import supertest from "supertest";
import prisma from "../src/database/prisma";
import { login } from "./testUtils";
import { __userFactory } from "./factories/userFactory";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "Users"`;
});

describe('GET /teachers/:id/tests', () => {
    it("returns 500 when header x-access-token isn't declared", async () => {
        const id = 1;
        const result =  await supertest(app).get(`/teachers/${id}/tests`).send();

        expect(result.status).toBe(500);
    });

    it("returns 401 when authorization token isn't sent", async () => {
        const id = 1;
        await supertest(app).get(`/teachers/${id}/tests`).send();
        const token = '';

        const result = await supertest(app).get(`/teachers/${id}/tests`)
        .set('x-access-token',token)
        .send();

        expect(result.status).toBe(401);
    });

    it("returns 200 and all tests by teachers!", async () => {
        const id = 1;
        const user = __userFactory();
        const { text:token } = await login(user);

        const result =  await supertest(app).get(`/teachers/${id}/tests`)
        .set('x-access-token',token)
        .send();

        expect(result.status).toBe(200);
        expect(result.text).not.toBeNull();
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});