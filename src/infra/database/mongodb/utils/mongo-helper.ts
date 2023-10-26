import { MongoClient } from "mongodb";

export class MongoHelper {
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
}
