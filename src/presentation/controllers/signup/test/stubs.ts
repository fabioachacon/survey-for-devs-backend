import { AccountModel } from "../../../../domain/models/account";
import {
  AddAccount,
  AddAccountModel,
} from "../../../../domain/usecases/add-account";

export class AddAccountStub implements AddAccount {
  async add(account: AddAccountModel): Promise<AccountModel> {
    return {
      id: "valid_id",
      name: "valid_name",
      email: "valid_password",
      password: "valid_password",
    };
  }
}

export const makeAddAccountStub = () => {
  return new AddAccountStub();
};
