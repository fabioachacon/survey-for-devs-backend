import { DbAddAccount } from "./db-add-account";
import { makeAddAccountRepositoryStub, makeEncrypterStub } from "./test/stubs";

const getSut = () => {
  const encryperStub = makeEncrypterStub();
  const repositoryStub = makeAddAccountRepositoryStub();

  return {
    sut: new DbAddAccount(encryperStub, repositoryStub),
    encryperStub,
    repositoryStub,
  };
};

const getMockedAccountData = () => {
  return {
    name: "valid_name",
    email: "valid_email",
    password: "any_password",
  };
};

describe("DbAddAccount", () => {
  test("Should call Encrypter.encrypt with password", async () => {
    const { sut, encryperStub } = getSut();

    const encryptSpy = jest.spyOn(encryperStub, "encrypt");

    const accoutData = getMockedAccountData();
    await sut.add(accoutData);

    expect(encryptSpy).toHaveBeenCalledWith("any_password");
  });

  test("Should throw Encrypter.encrypt throws", async () => {
    const { sut, encryperStub } = getSut();

    jest.spyOn(encryperStub, "encrypt").mockImplementationOnce(async () => {
      throw new Error();
    });

    const accountData = getMockedAccountData();
    const promise = sut.add(accountData);

    expect(promise).rejects.toThrow(new Error());
  });

  test("Should throw AddAccountRepository.add throws", async () => {
    const { sut, repositoryStub } = getSut();

    jest.spyOn(repositoryStub, "add").mockImplementationOnce(async () => {
      throw new Error();
    });

    const accountData = getMockedAccountData();
    const promise = sut.add(accountData);

    expect(promise).rejects.toThrow(new Error());
  });

  test("Should call AddAccountRepository with correct values", async () => {
    const { sut, repositoryStub } = getSut();

    const addAccountRepoSpy = jest.spyOn(repositoryStub, "add");
    const accountData = getMockedAccountData();

    await sut.add(accountData);
    expect(addAccountRepoSpy).toHaveBeenCalledWith({
      name: "valid_name",
      email: "valid_email",
      password: "hashed_password",
    });
  });
});
