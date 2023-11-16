import { Authentication } from "../../../domain/usecases/authentication";
import { InvalidParamError } from "../../errors/InvalidParamError";
import { MissingParamError } from "../../errors/MissingParamError";
import { httpResponses } from "../../helpers/http";
import { Controller } from "../../protocols/controller";
import { EmailValidator } from "../../protocols/email-validator";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class SignInController implements Controller {
  private readonly authentication: Authentication;
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator;
    this.authentication = authentication;
  }

  async handle(request: HttpRequest): Promise<HttpResponse | undefined> {
    try {
      const { email, password } = request.body;

      if (!email) {
        return httpResponses.badRequest(new MissingParamError("email"));
      } else if (!this.emailValidator.isValid(email)) {
        return httpResponses.badRequest(new InvalidParamError("email"));
      }

      if (!password) {
        return httpResponses.badRequest(new MissingParamError("password"));
      }

      const token = await this.authentication.auth(email, password);

      if (!token) {
        return httpResponses.unauthorized();
      }
    } catch (error) {
      return httpResponses.serverError(error);
    }
  }
}
