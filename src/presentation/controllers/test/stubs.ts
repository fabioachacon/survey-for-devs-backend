import { Authentication } from "../../../domain/usecases/authentication";
import { EmailValidator } from "../../protocols/email-validator";

export class EmailValidatorStub implements EmailValidator {
  public isValid(_email: string) {
    return true;
  }
}

export class AuthenticationStub implements Authentication {
  async auth(email: string, password: string): Promise<string> {
    return "token";
  }
}

export const makeEmailValidationStub = () => {
  return new EmailValidatorStub();
};

export const makeAuthenticationStub = () => {
  return new AuthenticationStub();
};
