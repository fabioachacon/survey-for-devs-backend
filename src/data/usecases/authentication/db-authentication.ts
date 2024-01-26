import { Credentials } from "../../../domain/models/credentials";
import {
  AuthParams,
  Authentication,
} from "../../../domain/usecases/authentication";
import { LoadAccountRepository } from "../../protocols/database/load-account-repository";

export class DbAuthentication implements Authentication {
  private readonly loadAccountRepository: LoadAccountRepository;

  constructor(loadAccountRepository: LoadAccountRepository) {
    this.loadAccountRepository = loadAccountRepository;
  }

  public async auth(credentials: Credentials): Promise<string | null> {
    await this.loadAccountRepository.loadByEmail(credentials.email);

    return "";
  }
}
