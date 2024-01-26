import { DbAuthentication } from "./db-authentication";
import { makeLoadAccoutRepositoryStub } from "./test/stubs";

const getSut = () => {
  const loadAccountRepository = makeLoadAccoutRepositoryStub();

  const sut = new DbAuthentication(loadAccountRepository);

  return { sut, loadAccountRepository };
};

const getMockedCredentials = () => {
  return {
    email: "email@mail.com",
    password: "password",
  };
};

describe("DbAuthentication", () => {
  test("Should call LoadAccountRepository with correct email", async () => {
    const { sut, loadAccountRepository } = getSut();

    const loadByEmailSpy = jest.spyOn(loadAccountRepository, "loadByEmail");

    const credentials = getMockedCredentials();
    await sut.auth(credentials);

    expect(loadByEmailSpy).toHaveBeenCalledWith("email@mail.com");
  });

  test("Should throw if LoadAccountRepository.loadByEmail throws", async () => {
    const { sut, loadAccountRepository } = getSut();

    jest
      .spyOn(loadAccountRepository, "loadByEmail")
      .mockImplementationOnce(async () => {
        throw new Error();
      });

    const credentials = getMockedCredentials();
    const result = sut.auth(credentials);

    expect(result).rejects.toThrow();
  });
});
