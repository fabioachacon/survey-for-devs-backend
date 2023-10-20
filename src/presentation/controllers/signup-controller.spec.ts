import { InvalidParamError } from "../errors/InvalidParamError";
import { MissingParamError } from "../errors/MissingParamError";
import { ServerError } from "../errors/ServerError";
import { EmailValidor } from "../protocols/email-validator";
import { SignUpController } from "./signup-controller";
import { EmailValidatorStub } from "./test/email-validator-stub";
import { getMockedHttpRequestBody } from "./test/mock-http-request-body";

type Sut = {
  sut: SignUpController;
  emailValidatorStub: EmailValidatorStub;
};

const getSut = (): Sut => {
  const emailValidatorStub = new EmailValidatorStub();

  return {
    sut: new SignUpController(emailValidatorStub),
    emailValidatorStub: emailValidatorStub,
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
    const response = await sut.handle(request);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toEqual(new Error("Invalid Password"));
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
    expect(response?.body).toEqual(new ServerError());
  });
});
