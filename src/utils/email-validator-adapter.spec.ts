import { EmailValidatorAdapter } from "./email-validator-adapter";
import validator from "validator";

const getSut = () => {
  return new EmailValidatorAdapter();
};

describe("EmailValidatorAdapter", () => {
  test("Should return false if EmailValidatorAdapter.isValid returns false", () => {
    const sut = getSut();

    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);

    const result = sut.isValid("");
    expect(result).toBe(false);
  });

  test("Should return true if EmailValidatorAdapter.isValid returns true", () => {
    const sut = getSut();

    jest.spyOn(validator, "isEmail").mockReturnValueOnce(true);

    const result = sut.isValid("");
    expect(result).toBe(true);
  });
});
