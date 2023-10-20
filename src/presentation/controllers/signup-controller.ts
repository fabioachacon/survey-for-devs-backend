import { MissingParamError } from "../errors/MissingParamError";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { httpErrors } from "../helpers/http";
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
      const requiredFields = this.getRequiredFields();

      for (const field of requiredFields) {
        if (!request.body[field]) {
          const error = new MissingParamError(field);
          return httpErrors.badRequest(error);
        }
      }

      if (!this.emailValidor.isValid(request.body.email)) {
        const error = new InvalidParamError("email");
        return httpErrors.badRequest(error);
      }
    } catch (error) {
      return httpErrors.serverError();
    }
  }

  private getRequiredFields() {
    return ["name", "email", "password", "passwordConfirmation"];
  }
}
