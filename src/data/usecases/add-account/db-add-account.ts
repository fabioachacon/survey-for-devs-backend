import { AddAccountRepository } from "../../protocols/database/add-account-repository";
import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  Encrypter,
} from "./db-add-account-protocols";

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;
  private readonly repository: AddAccountRepository;

  constructor(encrypter: Encrypter, repository: AddAccountRepository) {
    this.encrypter = encrypter;
    this.repository = repository;
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password);

    const createdAddcount = await this.repository.add({
      ...account,
      password: hashedPassword,
    });

    return createdAddcount;
  }
}
