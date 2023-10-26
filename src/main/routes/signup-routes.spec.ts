import request from "supertest";
import server from "../config/server";

describe("SignUp Routes", () => {
  test("Should return an account on success", async () => {
    await request(server)
      .post("/api/signup")
      .send({
        name: "Test",
        email: "test@test.com",
        password: "123",
        passwordConfirmation: "123",
      })
      .expect(200);
  });
});
