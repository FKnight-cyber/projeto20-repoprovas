import app from "../src/app";
import supertest from "supertest";
import prisma from "../src/database/prisma";
import { login } from "./testUtils";

const user = {
    email: "fulanodetal@gmail.com",
    password: "1234",
    confirmPass: "1234"
};

describe('GET /teachers/tests', () => {
    it("returns 500 when header x-access-token isn't declared", async () => {
        const result =  await supertest(app).get('/teachers/tests').send();

        expect(result.status).toBe(500);
    });

    it("returns 401 when authorization token isn't sent", async () => {
        await supertest(app).get('/teachers/tests').send();
        const token = '';

        const result = await supertest(app).get('/teachers/tests')
        .set('x-access-token',token)
        .send();

        expect(result.status).toBe(401);
    });

    it("returns 200 and all tests by teachers!", async () => {
        const { text:token } = await login(user);

        const result =  await supertest(app).get('/teachers/tests')
        .set('x-access-token',token)
        .send();

        expect(result.status).toBe(200);
        expect(result.text).not.toBeNull();
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});