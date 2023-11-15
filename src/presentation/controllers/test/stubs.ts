import { EmailValidator } from "../../protocols/email-validator";

export class EmailValidatorStub implements EmailValidator {
  public isValid(_email: string) {
    return true;
  }
}

export const makeEmailValidationStub = () => {
  return new EmailValidatorStub();
};
