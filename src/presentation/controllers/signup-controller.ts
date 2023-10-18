import { MissingParamError } from "../errors/MissingParamError";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { getBadRequest } from "../helpers/bad-request";
import { Controller } from "../protocols/controller";
import { EmailValidor } from "../protocols/email-validator";
import { InvalidParamError } from "../errors/InvalidParamError";
import { ServerError } from "../errors/ServerError";

export class SignUpController implements Controller {
  private readonly emailValidor: EmailValidor;

  constructor(emailValidor: EmailValidor) {
    this.emailValidor = emailValidor;
  }

  public async handle(request: HttpRequest): Promise<HttpResponse | undefined> {
    try {
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

      const isValidEmail = this.emailValidor.isValid(request.body.email);
      if (!isValidEmail) {
        return getBadRequest(new InvalidParamError("email"));
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError(),
      };
    }
  }
}
