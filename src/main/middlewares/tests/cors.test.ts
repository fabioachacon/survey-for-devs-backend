import server from "../../config/server";
import request from "supertest";

describe("CORS middleware", () => {
  test("Should enable cors", async () => {
    server.get("/test_cors", (req, res) => {
      res.send();
    });

    await request(server)
      .get("/test_cors")
      .expect("access-control-allow-origin", "*")
      .expect("access-control-allow-methods", "*")
      .expect("access-control-allow-headers", "*");
  });
});
