import { MongoClient } from "mongodb";

export class MongoManager {
  private static client: MongoClient;

  static async connect(uri: string) {
    this.client = await MongoClient.connect(uri);
  }

  static async disconnect() {
    await this.client.close();
  }

  static getCollection(name: string) {
    return this.client.db().collection(name);
  }

  static async clearCollection(name: string) {
    await this.getCollection(name).deleteMany({});
  }

  static async dropCollection(name: string) {
    await this.getCollection(name).drop();
  }
}
