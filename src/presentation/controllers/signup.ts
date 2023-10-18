import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController {
  public async handle(request: HttpRequest): Promise<HttpResponse | undefined> {
    if (!request?.body.name) {
      return {
        statusCode: 400,
        body: new Error("Missing param: name"),
      };
    } else if (!request?.body.email) {
      return {
        statusCode: 400,
        body: new Error("Missing param: email"),
      };
    }
  }
}
