import { MissingParamError } from "../../errors/MissingParamError";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { httpErrors } from "../../helpers/http";
import { Controller } from "../../protocols/controller";
import { EmailValidor } from "../../protocols/email-validator";
import { InvalidParamError } from "../../errors/InvalidParamError";
import { AddAccount } from "../../../domain/usecases/add-account";

export class SignUpController implements Controller {
  private readonly emailValidor: EmailValidor;
  private readonly addAccount: AddAccount;

  constructor(emailValidor: EmailValidor, addAccount: AddAccount) {
    this.emailValidor = emailValidor;
    this.addAccount = addAccount;
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

      const { name, email } = request.body;
      if (!this.emailValidor.isValid(email)) {
        const error = new InvalidParamError("email");
        return httpErrors.badRequest(error);
      }

      const { password, passwordConfirmation } = request.body;
      if (password !== passwordConfirmation) {
        return httpErrors.badRequest(
          new InvalidParamError("passwordConfirmation")
        );
      }

      this.addAccount.add({
        name: name,
        email: email,
        password: password,
      });
    } catch (error) {
      return httpErrors.serverError();
    }
  }

  private getRequiredFields() {
    return ["name", "email", "password", "passwordConfirmation"];
  }
}
