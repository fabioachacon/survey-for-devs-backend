import request from "supertest";
import server from "../../config/server";

describe("BodyParserMiddleware", () => {
  test("Should parse request body as json", async () => {
    server.post("/test_body_parser", (req, res) => {
      res.send(req.body);
    });

    await request(server)
      .post("/test_body_parser")
      .send({ name: "any" })
      .expect({ name: "any" });
  });
});
