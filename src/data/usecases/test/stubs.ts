import { Encrypter } from "../../protocols/encrypter";

export class EncrypterStub implements Encrypter {
  async encrypt(value: string) {
    return "dsfefgwq";
  }
}

export const makeEncrypterStub = () => {
  return new EncrypterStub();
};
