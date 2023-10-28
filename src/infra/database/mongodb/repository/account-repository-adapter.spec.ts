import { MongoManager } from "../utils/mongo-manager";
import { AccountMongoRepository } from "./account-repository-adapter";

const getSut = () => {
  return new AccountMongoRepository();
};

describe("Account Mongo Repository", () => {
  beforeAll(async () => {
    await MongoManager.connect(process.env.MONGO_URI!);
  });

  afterAll(async () => {
    await MongoManager.disconnect();
  });

  beforeEach(async () => {
    await MongoManager.clearCollection("accounts");
  });

  test("Should return an account on success", async () => {
    const sut = getSut();

    const account = await sut.add({
      name: "name",
      email: "valid_email",
      password: "hashed_password",
    });

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe("name");
    expect(account.email).toBe("valid_email");
    expect(account.password).toBe("hashed_password");
  });
});
