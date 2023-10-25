import { AddAccountRepository } from "../../../protocols/add-account-repository";
import { Encrypter } from "../../../protocols/encrypter";
import { AddAccountModel, AccountModel } from "../db-add-account-protocols";

export class EncrypterStub implements Encrypter {
  async encrypt(_value: string) {
    return "hashed_password";
  }
}

export class AddAccountRepositoryStub implements AddAccountRepository {
  async add(account: AddAccountModel): Promise<AccountModel> {
    return {
      id: "",
      ...account,
    };
  }
}

export const makeEncrypterStub = () => {
  return new EncrypterStub();
};

export const makeAddAccountRepositoryStub = () => {
  return new AddAccountRepositoryStub();
};
