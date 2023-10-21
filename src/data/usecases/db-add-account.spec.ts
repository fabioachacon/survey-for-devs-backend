import { DbAddAccount } from "./db-add-account";
import { makeEncrypterStub } from "./test/stubs";

const getSut = () => {
  const encryperStub = makeEncrypterStub();

  return {
    sut: new DbAddAccount(encryperStub),
    encryperStub,
  };
};

const getMockedAccountData = () => {
  return {
    name: "any_name",
    email: "any_email",
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

    const accoutData = getMockedAccountData();
    const promise = sut.add(accoutData);

    expect(promise).rejects.toThrow(new Error());
  });
});
