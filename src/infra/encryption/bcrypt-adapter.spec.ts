import bcrypt from "bcrypt";

import { BcryptAdapter } from "./bcrypt-adapter";

const getSut = () => {
  const SALT = 12;
  return new BcryptAdapter(SALT);
};

describe("BcryptAdapter", () => {
  test("Should call bcrypt with correct value", () => {
    const sut = getSut();

    const hashSpy = jest.spyOn(bcrypt, "hash");

    sut.encrypt("value");
    expect(hashSpy).toHaveBeenCalledWith("value", 12);
  });

  test("Should return a hashed value if encryption is successful", async () => {
    const sut = getSut();

    jest.spyOn(bcrypt, "hash").mockImplementationOnce(async () => {
      return "hash";
    });

    const hash = await sut.encrypt("value");
    expect(hash).toBe("hash");
  });

  test("Should throws if BcryptAdater.encrypt throws", async () => {
    const sut = getSut();

    jest.spyOn(bcrypt, "hash").mockImplementationOnce(async () => {
      throw new Error();
    });

    const promise = sut.encrypt("value");
    expect(promise).rejects.toThrow(new Error());
  });
});
