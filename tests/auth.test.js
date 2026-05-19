import request from "supertest";
import server from "../app.js";

describe("Auth API", () => {
  test("should login existing user", async () => {
    const email = `login${Date.now()}@example.com`;

    // Register first
    await request(server)
      .post("/auth/register")
      .send({
        name: "Login User",
        email,
        password: "123456"
      });

    // Login
    const res = await request(server)
      .post("/auth/login")
      .send({
        email,
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});