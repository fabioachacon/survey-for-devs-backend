import { InvalidParamError } from "../errors/InvalidParamError";
import { EmailValidator } from "../protocols/email-validator";
import { EmailValidation } from "./email-validation";
import { makeEmailValidatorStub } from "./tests/stub";

type Sut = {
  sut: EmailValidation;
  validationStub: EmailValidator;
};

const getSut = (): Sut => {
  const validationStub = makeEmailValidatorStub();

  return {
    sut: new EmailValidation("email", validationStub),
    validationStub,
  };
};

describe("EmailValidation", () => {
  test("Should call EmailValidator with correct email", () => {
    const { sut, validationStub } = getSut();

    const isValidSpy = jest.spyOn(validationStub, "isValid");

    sut.validate({ email: "any_email@email.com" });

    expect(isValidSpy).toHaveBeenCalledWith("any_email@email.com");
  });

  test("Should throw if EmailValidor.isValid throws", () => {
    const { sut, validationStub } = getSut();

    jest.spyOn(validationStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });

    expect(sut.validate).toThrow();
  });

  test("Should return an Error if EmailValidor.isValid returns false", () => {
    const { sut, validationStub } = getSut();

    jest.spyOn(validationStub, "isValid").mockReturnValueOnce(false);

    const error = sut.validate({ email: "any_email@email.com" });

    expect(error).toEqual(new InvalidParamError("email"));
  });
});
