import { HttpRequest, HttpResponse } from "../../protocols/http";
import { httpResponses } from "../../helpers/http";
import { Controller } from "../../protocols/controller";
import { AddAccount } from "../../../domain/usecases/add-account";
import { Validation } from "../../protocols/validation";

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount;
  private readonly validation: Validation;

  constructor(addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount;
    this.validation = validation;
  }

  public async handle(request: HttpRequest): Promise<HttpResponse | undefined> {
    try {
      const body = request.body;

      const error = this.validation.validate(body);
      if (error) {
        return httpResponses.badRequest(error);
      }

      const account = await this.createAccount(body);
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
}
