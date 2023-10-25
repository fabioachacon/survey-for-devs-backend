import { BcryptAdapter } from "./bcrypt-adapter";
import bcrypt from "bcrypt";

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
});
