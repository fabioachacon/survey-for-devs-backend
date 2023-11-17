import { MissingParamError } from "../../errors/MissingParamError";
import { httpResponses } from "../../helpers/http";
import { makeAuthenticationStub, makeEmailValidationStub } from "../test/stubs";
import { SignInController } from "./signin-controller";

const getMockedRequestBody = () => {
  return {
    email: "any@mail.com",
    password: "any_password",
  };
};

const makeBody = (props: Record<string, any>) => {
  return {
    body: {
      ...props,
    },
  };
};

const getSut = () => {
  const authenticationStub = makeAuthenticationStub();
  const emailValidatorStub = makeEmailValidationStub();

  return {
    sut: new SignInController(emailValidatorStub, authenticationStub),
    emailValidatorStub,
    authenticationStub,
  };
};

describe("SignInController", () => {
  test("Should return 400 if no email is provided", async () => {
    const { sut } = getSut();

    const { password } = getMockedRequestBody();
    const requestBody = makeBody({ password });

    const response = await sut.handle(requestBody);

    expect(response).toEqual(
      httpResponses.badRequest(new MissingParamError("email"))
    );
  });

  test("Should return 400 if no password is provided", async () => {
    const { sut } = getSut();

    const { email } = getMockedRequestBody();
    const request = makeBody({ email });

    const response = await sut.handle(request);

    expect(response).toEqual(
      httpResponses.badRequest(new MissingParamError("password"))
    );
  });

  test("Should return 400 if EmailValidator.validate is called with an invalid email", async () => {
    const { sut, emailValidatorStub } = getSut();

    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");
    isValidSpy.mockReturnValueOnce(false);

    const request = getMockedRequestBody();
    const requestBody = makeBody(request);

    const response = await sut.handle(requestBody);
    expect(response?.statusCode).toBe(400);
  });

  test("Should call EmailValidator.validate with a value", async () => {
    const { sut, emailValidatorStub } = getSut();

    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");

    const request = getMockedRequestBody();
    const requestBody = makeBody(request);

    await sut.handle(requestBody);
    expect(isValidSpy).toHaveBeenCalledWith("any@mail.com");
  });

  test("Should call EmailValidator.validate with valid email", async () => {
    const { sut, emailValidatorStub } = getSut();

    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");

    const requestBody = getMockedRequestBody();
    const request = makeBody(requestBody);

    await sut.handle(request);
    expect(isValidSpy).toHaveReturnedWith(true);
  });

  test("Should return 500 if EmailValidator throws", async () => {
    const { sut, emailValidatorStub } = getSut();

    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });

    const requestBody = getMockedRequestBody();
    const request = makeBody(requestBody);

    const response = await sut.handle(request);
    expect(response).toEqual(
      httpResponses.serverError(new Error().stack || "")
    );
  });

  test("Should call Authentication with correct values", async () => {
    const { sut, authenticationStub } = getSut();

    const authSpy = jest.spyOn(authenticationStub, "auth");

    const requestBody = getMockedRequestBody();
    const request = makeBody(requestBody);

    await sut.handle(request);
    expect(authSpy).toHaveBeenCalledWith("any@mail.com", "any_password");
  });

  test("Should return 401 if invalid credentials are provided", async () => {
    const { sut, authenticationStub } = getSut();

    jest
      .spyOn(authenticationStub, "auth")
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)));

    const requestBody = getMockedRequestBody();
    const request = makeBody(requestBody);

    const response = await sut.handle(request);
    expect(response).toEqual(httpResponses.unauthorized());
  });

  test("Should return 500 if Authentication throws", async () => {
    const { sut, authenticationStub } = getSut();

    jest
      .spyOn(authenticationStub, "auth")
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      );

    const requestBody = getMockedRequestBody();
    const request = makeBody(requestBody);

    const response = await sut.handle(request);
    expect(response).toEqual(
      httpResponses.serverError(new Error().stack || "")
    );
  });
});
