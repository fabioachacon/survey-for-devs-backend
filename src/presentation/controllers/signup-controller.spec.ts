import { MissingParamError } from "../errors/MissingParamError";
import { SignUpController } from "./signup-controller";

type RequestBody = {
  body: {
    name?: string;
    email?: string;
    password?: string;
    passwordConfirmation?: string;
  };
};

const getMockedHttpRequestBody = (): RequestBody => {
  return {
    body: {
      name: "jon",
      email: "test@mail.com",
      password: "any_password",
      passwordConfirmation: "any_confirmation",
    },
  };
};

describe("SignUp Controller", () => {
  test("Should return 400 if no name is provided", async () => {
    const sut = new SignUpController();

    const request = getMockedHttpRequestBody();
    const { name, ...body } = request.body;

    request.body = body;
    const response = await sut.handle(request);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toEqual(new MissingParamError("name"));
  });

  test("Should return 400 if no email is provided", async () => {
    const sut = new SignUpController();

    const request = getMockedHttpRequestBody();
    const { email, ...body } = request.body;

    request.body = body;
    const response = await sut.handle(request);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if no password is provided", async () => {
    const sut = new SignUpController();

    const request = getMockedHttpRequestBody();
    const { password, ...body } = request.body;

    request.body = body;
    const response = await sut.handle(request);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toEqual(new MissingParamError("password"));
  });

  test("Should return 400 if password confirmation is not provided", async () => {
    const sut = new SignUpController();

    const request = getMockedHttpRequestBody();
    const { passwordConfirmation, ...body } = request.body;

    request.body = body;
    const response = await sut.handle(request);

    expect(response?.statusCode).toBe(400);
    expect(response?.body).toEqual(
      new MissingParamError("passwordConfirmation")
    );
  });
});
