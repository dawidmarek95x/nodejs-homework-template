const mongoose = require("mongoose");
const request = require("supertest");
const express = require("express");
require("dotenv").config();
const app = require("../app");

app.use(express.json());
const { DB_HOST: DB_URI } = process.env;

beforeAll(async () => {
  await mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

describe('Users tests', () => {
  test('Test register', async () => {
    const userData = {
      name: "Peter Parker",
      email: "spiderman@avengers.com",
      password: "Spider321go"
    }

    const res = await request(app)
      .post("/api/users/signup")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(userData);

    const {message, user} = res.body;

    expect(res.statusCode).toBe(201);
    expect(message).toBe("User created");
    expect(typeof user).toBe("object");
    expect(typeof user.email).toBe("string");
    expect(user.email).toMatch(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/);
    expect(typeof user.subscription).toBe("string");
    expect(user.subscription).toMatch(/starter|pro|business/);
  });

  test('Test login', async () => {
    const userCredentials = {
      email: "spiderman@avengers.com",
      password: "Spider321go"
    }

    const res = await request(app)
      .post("/api/users/login")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(userCredentials);

      const {token, user} = res.body;

      expect(res.statusCode).toBe(200);
      expect(token).toBeTruthy();
      expect(typeof user).toBe("object");
      expect(typeof user.email).toBe("string");
      expect(user.email).toMatch(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/);
      expect(typeof user.subscription).toBe("string")
      expect(user.subscription).toMatch(/starter|pro|business/);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});