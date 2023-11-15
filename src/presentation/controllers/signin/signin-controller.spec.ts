import { MissingParamError } from "../../errors/MissingParamError";
import { httpResponses } from "../../helpers/http";
import { makeEmailValidationStub } from "../test/stubs";
import { SignInController } from "./signin-controller";

const getSut = () => {
  const emailValidatorStub = makeEmailValidationStub();
  return {
    sut: new SignInController(emailValidatorStub),
    emailValidatorStub,
  };
};

describe("SignInController", () => {
  test("Should return 400 if no email is provided", async () => {
    const { sut } = getSut();

    const request = {
      body: {
        password: "any_password",
      },
    };

    const response = await sut.handle(request);
    expect(response).toEqual(
      httpResponses.badRequest(new MissingParamError("email"))
    );
  });

  test("Should return 400 if no password is provided", async () => {
    const { sut } = getSut();

    const request = {
      body: {
        email: "any@mail.com",
      },
    };

    const response = await sut.handle(request);
    expect(response).toEqual(
      httpResponses.badRequest(new MissingParamError("password"))
    );
  });

  test("Should return 400 if EmailValidator.validate is called with an invalid email", async () => {
    const { sut, emailValidatorStub } = getSut();

    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");
    isValidSpy.mockReturnValueOnce(false);

    const request = {
      body: {
        password: "any_password",
        email: "any@mail.com",
      },
    };

    const response = await sut.handle(request);
    expect(response?.statusCode).toBe(400);
  });

  test("Should call EmailValidator.validate with a value", async () => {
    const { sut, emailValidatorStub } = getSut();

    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");

    const request = {
      body: {
        password: "any_password",
        email: "any@mail.com",
      },
    };

    await sut.handle(request);
    expect(isValidSpy).toHaveBeenCalledWith("any@mail.com");
  });

  test("Should call EmailValidator.validate with valid email", async () => {
    const { sut, emailValidatorStub } = getSut();

    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");

    const request = {
      body: {
        password: "any_password",
        email: "any@mail.com",
      },
    };

    await sut.handle(request);
    expect(isValidSpy).toHaveReturnedWith(true);
  });

  test("Should return 500 if EmailValidator throws", async () => {
    const { sut, emailValidatorStub } = getSut();

    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });

    const request = {
      body: {
        password: "any_password",
        email: "any@mail.com",
      },
    };

    const response = await sut.handle(request);
    expect(response).toEqual(
      httpResponses.serverError(new Error().stack || "")
    );
  });
});
