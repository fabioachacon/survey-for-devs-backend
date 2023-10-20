import { MissingParamError } from "../errors/MissingParamError";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { httpErrors } from "../helpers/http";
import { Controller } from "../protocols/controller";
import { EmailValidor } from "../protocols/email-validator";
import { InvalidParamError } from "../errors/InvalidParamError";

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

      if (this.isValidPasswordConfimation(request)) {
        return httpErrors.badRequest(new Error("Invalid Password"));
      }
    } catch (error) {
      return httpErrors.serverError();
    }
  }

  private getRequiredFields() {
    return ["name", "email", "password", "passwordConfirmation"];
  }

  private isValidPasswordConfimation(request: HttpRequest) {
    return request.body.password !== request.body.passwordConfirmation;
  }
}
