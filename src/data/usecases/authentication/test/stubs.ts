import { LoadAccountRepository } from "../../../protocols/database/load-account-repository";
import { AccountModel } from "../../add-account/db-add-account-protocols";

class LoadAccountStub implements LoadAccountRepository {
  public async loadByEmail(email: string): Promise<AccountModel | undefined> {
    const account: AccountModel = {
      id: "any",
      name: "jon doe",
      email: "jondoe@email.com",
      password: "any",
    };

    return account;
  }
}

export const makeLoadAccoutRepositoryStub = () => {
  return new LoadAccountStub();
};
