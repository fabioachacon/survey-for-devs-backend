import { MissingParamError } from "../errors/MissingParamError";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { getBadRequest } from "../helpers/mock-bad-request";

export class SignUpController {
  public async handle(request: HttpRequest): Promise<HttpResponse | undefined> {
    const requiredFields = [
      "name",
      "email",
      "password",
      "passwordConfirmation",
    ];

    for (const field of requiredFields) {
      if (!request.body[field]) {
        return getBadRequest(new MissingParamError(field));
      }
    }
  }
}
