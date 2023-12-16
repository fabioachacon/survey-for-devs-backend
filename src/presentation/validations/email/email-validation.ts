import { InvalidParamError } from "../../errors/InvalidParamError";
import { EmailValidator } from "../../protocols/email-validator";
import { Validation } from "../../protocols/validation";

export class EmailValidation implements Validation {
  private readonly fieldName: string;
  private readonly emailValidator: EmailValidator;

  constructor(fieldName: string, emailValidator: EmailValidator) {
    this.fieldName = fieldName;
    this.emailValidator = emailValidator;
  }

  validate(value: any): Error | null | undefined {
    if (!this.emailValidator.isValid(value[this.fieldName])) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
