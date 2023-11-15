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
      const requestBody = request.body;

      const field = this.hasRequiredFields(requestBody);
      if (field) {
        return httpResponses.badRequest(new MissingParamError(field));
      }

      if (!this.isValidEmail(requestBody.email)) {
        return httpResponses.badRequest(new InvalidParamError("email"));
      }

      if (this.isValidPasswordConfirmation(requestBody)) {
        return httpResponses.badRequest(
          new InvalidParamError("passwordConfirmation")
        );
      }

      const account = await this.createAccount(requestBody);
      if (account) {
        return httpResponses.ok(account);
      }
    } catch (error) {
      if (error instanceof Error) {
        return httpResponses.serverError(error.stack || "");
      }
    }
  }

  private async createAccount(payload: Record<string, any>) {
    const { name, email, password } = payload;

    const account = await this.addAccount.add({
      name: name,
      email: email,
      password: password,
    });

    return account;
  }

  private hasRequiredFields(payload: Record<string, any>) {
    const requiredFields = this.getRequiredFields();
    for (const field of requiredFields) {
      if (!payload[field]) {
        return field;
      }
    }
  }

  private isValidEmail(email: string) {
    return this.emailValidor.isValid(email);
  }

  private isValidPasswordConfirmation(payload: Record<string, any>) {
    const { password, passwordConfirmation } = payload;

    return password !== passwordConfirmation;
  }

  private getRequiredFields() {
    return ["name", "email", "password", "passwordConfirmation"];
  }
}
