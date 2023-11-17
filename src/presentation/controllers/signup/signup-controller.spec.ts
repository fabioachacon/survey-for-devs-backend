import { InvalidParamError } from "../../errors/InvalidParamError";
import { MissingParamError } from "../../errors/MissingParamError";
import { ServerError } from "../../errors/ServerError";
import { SignUpController } from "./signup-controller";

import { makeAddAccountStub } from "./test/stubs";

import { AddAccount } from "../../../domain/usecases/add-account";

import { getMockedHttpRequestBody } from "./test/mock-http-request-body";
import {
  EmailValidatorStub,
  makeEmailValidationStub,
  makeValidationStub,
} from "../test/stubs";
import { httpResponses } from "../../helpers/http";

const getSut = () => {
  const emailValidatorStub = makeEmailValidationStub();
  const addAccountStub = makeAddAccountStub();
  const validationStub = makeValidationStub();

  return {
    sut: new SignUpController(
      emailValidatorStub,
      addAccountStub,
      validationStub
    ),
    emailValidatorStub: emailValidatorStub,
    addAccountStub: addAccountStub,
    validationStub,
  };
};

describe("SignUp Controller", () => {
  test("Should return 400 if name is not provided", async () => {
    const { sut } = getSut();

    const request = getMockedHttpRequestBody();
    const { name, ...body } = request.body;

    request.body = body;
    const response = await sut.handle(request);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toEqual(new MissingParamError("name"));
  });

  test("Should return 400 if email is not provided", async () => {
    const { sut } = getSut();

    const request = getMockedHttpRequestBody();
    const { email, ...body } = request.body;

    request.body = body;
    const response = await sut.handle(request);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if password is not provided", async () => {
    const { sut } = getSut();

    const request = getMockedHttpRequestBody();
    const { password, ...body } = request.body;

    request.body = body;
    const response = await sut.handle(request);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toEqual(new MissingParamError("password"));
  });

  test("Should return 400 if password confirmation is not provided", async () => {
    const { sut } = getSut();

    const request = getMockedHttpRequestBody();
    const { passwordConfirmation, ...body } = request.body;

    request.body = body;
    const response = await sut.handle(request);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toEqual(
      new MissingParamError("passwordConfirmation")
    );
  });

  test("Should return 400 if an Invalid Email is provided", async () => {
    const { sut, emailValidatorStub } = getSut();

    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);

    const request = getMockedHttpRequestBody();
    const response = await sut.handle(request);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toEqual(new InvalidParamError("email"));
  });

  test("Should return 400 if password confirmations fails", async () => {
    const { sut } = getSut();

    const request = getMockedHttpRequestBody();

    request.body.passwordConfirmation = "any_confirmation";
    const response = await sut.handle(request);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toEqual(
      new InvalidParamError("passwordConfirmation")
    );
  });

  test("Should call EmailValidator.isValid with correct email", async () => {
    const { sut, emailValidatorStub } = getSut();

    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");

    const request = getMockedHttpRequestBody();
    sut.handle(request);

    expect(isValidSpy).toHaveBeenCalledWith(request.body.email);
  });

  test("Should return 500 if EmailValidator throws an Exception", async () => {
    const { sut, emailValidatorStub } = getSut();

    const isValidMockedImpl = () => {
      throw new Error();
    };

    jest
      .spyOn(emailValidatorStub, "isValid")
      .mockImplementationOnce(isValidMockedImpl);

    const request = getMockedHttpRequestBody();
    const response = await sut.handle(request);

    expect(response?.statusCode).toBe(500);
    expect(response?.body).toEqual(new ServerError(""));
  });

  test("Should call AddAcount.add with correct values", async () => {
    const { sut, addAccountStub } = getSut();

    const addSpy = jest.spyOn(addAccountStub, "add");

    const request = getMockedHttpRequestBody();
    sut.handle(request);

    expect(addSpy).toHaveBeenCalledWith({
      name: "any_name",
      email: "any_email",
      password: "any_password",
    });
  });

  test("Shoul return 500 if AddAcount.add throws an Exception", async () => {
    const { sut, addAccountStub } = getSut();

    const mockImpl = async () => {
      throw new Error();
    };

    jest.spyOn(addAccountStub, "add").mockImplementationOnce(mockImpl);

    const request = getMockedHttpRequestBody();
    const response = await sut.handle(request);

    expect(response?.statusCode).toBe(500);
    expect(response?.body).toEqual(new ServerError(""));
  });

  test("Should return 200 if valid data is provided", async () => {
    const { sut } = getSut();

    const request = getMockedHttpRequestBody();
    const response = await sut.handle(request);

    expect(response?.statusCode).toBe(200);
    expect(response?.body).toEqual({
      id: "valid_id",
      name: "valid_name",
      email: "valid_password",
      password: "valid_password",
    });
  });

  test("Should call Validataion with correct value", async () => {
    const { sut, validationStub } = getSut();

    const validatedSpy = jest.spyOn(validationStub, "validate");

    const request = getMockedHttpRequestBody();

    await sut.handle(request);
    expect(validatedSpy).toHaveBeenCalledWith(request.body);
  });
});
