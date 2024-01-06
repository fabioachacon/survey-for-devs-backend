import { MissingParamError } from "../../errors/MissingParamError";
import { EmailValidator } from "../../protocols/email-validator";
import { Validation } from "../../protocols/validation";

export class EmailValidatorStub implements EmailValidator {
  public isValid(_email: string) {
    return true;
  }
}

export const makeEmailValidatorStub = () => {
  return new EmailValidatorStub();
};

export class ValidationStub implements Validation {
  validate(value: any): Error | null | undefined {
    return new MissingParamError("field");
  }
}
