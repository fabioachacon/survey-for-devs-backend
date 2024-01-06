import { MissingParamError } from "../../errors/MissingParamError";
import { ServerError } from "../../errors/ServerError";
import { SignUpController } from "./signup-controller";

import { makeAddAccountStub } from "./test/stubs";
import { getMockedHttpRequestBody } from "./test/mock-http-request-body";
import { makeValidationStub } from "../test/stubs";
import { httpResponses } from "../../helpers/http";

const getSut = () => {
  const addAccountStub = makeAddAccountStub();
  const validationStub = makeValidationStub();

  return {
    sut: new SignUpController(addAccountStub, validationStub),
    addAccountStub,
    validationStub,
  };
};

describe("SignUp Controller", () => {
  test("Should return 400 if name is not provided", async () => {
    const { sut, validationStub } = getSut();

    jest
      .spyOn(validationStub, "validate")
      .mockReturnValueOnce(new MissingParamError("name"));

    const request = getMockedHttpRequestBody();
    const { name, ...body } = request.body;

    request.body = body;
    const response = await sut.handle(request);

    expect(response).toEqual(
      httpResponses.badRequest(new MissingParamError("name"))
    );
  });

  test("Should return 400 if email is not provided", async () => {
    const { sut, validationStub } = getSut();

    jest
      .spyOn(validationStub, "validate")
      .mockReturnValueOnce(new MissingParamError("email"));

    const request = getMockedHttpRequestBody();
    const { email, ...body } = request.body;

    request.body = body;
    const response = await sut.handle(request);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toEqual(new MissingParamError("email"));
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

  test("Should return 400 if Validation returns error", async () => {
    const { sut, validationStub } = getSut();

    jest
      .spyOn(validationStub, "validate")
      .mockReturnValueOnce(new MissingParamError("field"));

    const request = getMockedHttpRequestBody();

    const response = await sut.handle(request);
    expect(response).toEqual(
      httpResponses.badRequest(new MissingParamError("field"))
    );
  });
});
