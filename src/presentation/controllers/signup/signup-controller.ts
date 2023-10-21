import { MissingParamError } from "../../errors/MissingParamError";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { httpResponses } from "../../helpers/http";
import { Controller } from "../../protocols/controller";
import { EmailValidator } from "../../protocols/email-validator";
import { InvalidParamError } from "../../errors/InvalidParamError";
import { AddAccount } from "../../../domain/usecases/add-account";

export class SignUpController implements Controller {
  private readonly emailValidor: EmailValidator;
  private readonly addAccount: AddAccount;

  constructor(emailValidor: EmailValidator, addAccount: AddAccount) {
    this.emailValidor = emailValidor;
    this.addAccount = addAccount;
  }

  public async handle(request: HttpRequest): Promise<HttpResponse | undefined> {
    try {
      const requiredFields = this.getRequiredFields();
      for (const field of requiredFields) {
        if (!request.body[field]) {
          const error = new MissingParamError(field);
          return httpResponses.badRequest(error);
        }
      }

      const { name, email } = request.body;
      if (!this.emailValidor.isValid(email)) {
        const error = new InvalidParamError("email");
        return httpResponses.badRequest(error);
      }

      const { password, passwordConfirmation } = request.body;
      if (password !== passwordConfirmation) {
        return httpResponses.badRequest(
          new InvalidParamError("passwordConfirmation")
        );
      }

      const account = await this.addAccount.add({
        name: name,
        email: email,
        password: password,
      });

      return httpResponses.ok(account);
    } catch (error) {
      console.error(error);

      return httpResponses.serverError();
    }
  }

  private getRequiredFields() {
    return ["name", "email", "password", "passwordConfirmation"];
  }
}
