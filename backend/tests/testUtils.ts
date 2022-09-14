import app from "../src/app";
import supertest from "supertest";

export async function login(user:any){
    await supertest(app).post('/sign-up').send(user);

    return await supertest(app).post('/sign-in').send(user);
}