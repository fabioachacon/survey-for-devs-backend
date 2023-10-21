import { EmailValidatorAdapter } from "./email-validator-adapter";

const getSut = () => {
  return new EmailValidatorAdapter();
};

describe("EmailValidatorAdapter", () => {
  test("Should return false if validator returns false", () => {
    const sut = getSut();

    const result = sut.isValid("--invalid email--");
    expect(result).toBe(false);
  });
});
