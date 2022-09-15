import app from "../src/app";
import supertest from "supertest";
import prisma from "../src/database/prisma";
import { login } from "./testUtils";
import { __userData } from "./factories/userData";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "Users"`;
});

describe('GET /disciplines/tests', () => {
    it("returns 500 when header x-access-token isn't declared", async () => {
        const result =  await supertest(app).get('/disciplines/tests').send();

        expect(result.status).toBe(500);
    });

    it("returns 401 when authorization token isn't sent", async () => {
        await supertest(app).get('/disciplines/tests').send();
        const token = '';

        const result = await supertest(app).get('/disciplines/tests')
        .set('x-access-token',token)
        .send();

        expect(result.status).toBe(401);
    });

    it("returns 200 and all tests by discipline!", async () => {
        const user = __userData();
        const { text:token } = await login(user);

        const result =  await supertest(app).get('/disciplines/tests')
        .set('x-access-token',token)
        .send();

        expect(result.status).toBe(200);
        expect(result.text).not.toBeNull();
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});