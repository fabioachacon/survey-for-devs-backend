import { EmailValidatorAdapter } from "./email-validator-adapter";
import validator from "validator";

const getSut = () => {
  return new EmailValidatorAdapter();
};

describe("EmailValidatorAdapter", () => {
  test("Should return false if EmailValidatorAdapter.isValid returns false", () => {
    const sut = getSut();

    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);

    const result = sut.isValid("any_value");
    expect(result).toBe(false);
  });

  test("Should return true if EmailValidatorAdapter.isValid returns true", () => {
    const sut = getSut();

    jest.spyOn(validator, "isEmail").mockReturnValueOnce(true);

    const result = sut.isValid("any_value");
    expect(result).toBe(true);
  });

  test("Should call EmailValidatorAdapter.isValid with correct argument", () => {
    const sut = getSut();

    const isEmailSpy = jest.spyOn(validator, "isEmail");

    sut.isValid("any_value");
    expect(isEmailSpy).toHaveBeenCalledWith("any_value");
  });

  test("Should call EmailValidatorAdapter.isValid with valid email", () => {
    const sut = getSut();

    const isEmailSpy = jest.spyOn(validator, "isEmail");

    sut.isValid("test@test.com");
    expect(isEmailSpy).toHaveLastReturnedWith(true);
  });
});
