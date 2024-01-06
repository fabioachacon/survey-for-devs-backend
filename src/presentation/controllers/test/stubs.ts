import { Authentication } from "../../../domain/usecases/authentication";
import { EmailValidator } from "../../protocols/email-validator";
import { Validation } from "../../protocols/validation";

export class ValidationStub implements Validation {
  validate(value: any): Error | null {
    return null;
  }
}

export class EmailValidatorStub implements EmailValidator {
  public isValid(_email: string) {
    return true;
  }
}

export const makeEmailValidationStub = () => {
  return new EmailValidatorStub();
};

export class AuthenticationStub implements Authentication {
  async auth(email: string, password: string): Promise<string | null> {
    return "token";
  }
}

export const makeAuthenticationStub = () => {
  return new AuthenticationStub();
};

export const makeValidationStub = () => {
  return new ValidationStub();
};
