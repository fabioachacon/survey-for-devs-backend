import { AccountModel } from "../../../../domain/models/account";
import {
  AddAccount,
  AddAccountModel,
} from "../../../../domain/usecases/add-account";
import { EmailValidor } from "../../../protocols/email-validator";

export class EmailValidatorStub implements EmailValidor {
  public isValid(_email: string) {
    return true;
  }
}

export class AddAccountStub implements AddAccount {
  add(account: AddAccountModel): AccountModel {
    return {
      id: "valid_id",
      name: "valid_name",
      email: "valid_password",
      password: "valid_password",
    };
  }
}

export const makeEmailValidationStub = () => {
  return new EmailValidatorStub();
};

export const makeAddAccountStub = () => {
  return new AddAccountStub();
};
