import { InvalidParamError } from "../../errors/InvalidParamError";
import { MissingParamError } from "../../errors/MissingParamError";
import { httpResponses } from "../../helpers/http";
import { Controller } from "../../protocols/controller";
import { EmailValidator } from "../../protocols/email-validator";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class SignInController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  async handle(request: HttpRequest): Promise<HttpResponse | undefined> {
    const { email, password } = request.body;

    if (!email) {
      return httpResponses.badRequest(new MissingParamError("email"));
    } else if (!this.emailValidator.isValid(email)) {
      return httpResponses.badRequest(new InvalidParamError("email"));
    }

    if (!password) {
      return httpResponses.badRequest(new MissingParamError("password"));
    }
  }
}
