import server from "../../config/server";
import request from "supertest";

describe("Content Type Middleware", () => {
  test("Should return json as default content type", async () => {
    server.get("/test_content_type", (req, res) => {
      res.send();
    });

    await request(server)
      .get("/test_content_type")
      .expect("content-type", /json/);
  });

  test("Should return xml content type when enforced", async () => {
    server.get("/test_xml_content_type", (req, res) => {
      res.type("xml");
      res.send("");
    });

    await request(server)
      .get("/test_xml_content_type")
      .expect("content-type", /xml/);
  });
});
