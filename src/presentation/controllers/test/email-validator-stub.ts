import { EmailValidor } from "../../protocols/email-validator";

export class EmailValidatorStub implements EmailValidor {
  public isValid(_email: string) {
    return true;
  }
}
