import request from "supertest";
import server from "../app.js";

describe("Donor API", () => {
  test("should fetch donors", async () => {
    const res = await request(server).get("/donor");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});