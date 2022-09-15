import app from "../src/app";
import supertest from "supertest";
import prisma from "../src/database/prisma";
import { login } from "./testUtils";
import { __userData } from "./factories/userData";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "Users"`;
});

describe('POST /sign-in', () => {
    it("returns 422 when confirmPass doesn't match password!", async () => {

        const failUser = {
            email: "fulanodetal@gmail.com",
            password: "1234",
            confirmPass: "12345"
        };

        const result = await supertest(app).post('/sign-in').send(failUser);

        expect(result.status).toBe(422);
    });

    it("returns 401 when email isn't registered!", async () => {
        const unregisteredUser = __userData();

        const result = await supertest(app).post('/sign-in').send(unregisteredUser);

        expect(result.status).toBe(401);
    });

    it("returns 401 when password is wrong", async () => {

        const user = __userData();

        await supertest(app).post('/sign-up').send(user);

        const result = await supertest(app).post('/sign-in').send({
            email: user.email,
            password: "1234",
            confirmPass: "1234"
        });

        expect(result.status).toBe(401);
    });

    it("returns 200 when successfully login", async () => {
        const user = __userData();

        const result = await login(user);

        expect(result.status).toBe(200);
        expect(result.text).not.toBeNull();
    })
});

afterAll(async () => {
    await prisma.$disconnect();
})