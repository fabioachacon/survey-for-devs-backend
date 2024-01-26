import { AccountModel } from "../../usecases/add-account/db-add-account-protocols";

export interface LoadAccountRepository {
  loadByEmail(email: string): Promise<AccountModel | undefined>;
}
