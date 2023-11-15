import { MongoManager as sut } from "./mongo-manager";

describe("MongoManager", () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URI!);
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test("Should reconnect if mongodb is down", async () => {
    const accountCollection = sut.getCollection("accounts");
    expect(accountCollection).toBeTruthy();
  });
});
