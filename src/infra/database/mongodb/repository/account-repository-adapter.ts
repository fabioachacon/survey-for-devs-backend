import { AddAccountRepository } from "../../../../data/protocols/database/add-account-repository";
import { AccountModel } from "../../../../domain/models/account";
import { AddAccountModel } from "../../../../domain/usecases/add-account";
import { MongoManager } from "../utils/mongo-manager";

export class AccountMongoRepository implements AddAccountRepository {
  private readonly COLLECTION_NAME = "accounts";

  async add(account: AddAccountModel): Promise<AccountModel> {
    const collection = MongoManager.getCollection(this.COLLECTION_NAME);
    const { insertedId } = await collection.insertOne(account);

    const databaseRecord = await collection.findOne<AccountModel>();
    const createdAccount = Object.assign({}, databaseRecord, {
      id: String(insertedId),
    });

    return createdAccount;
  }
}
