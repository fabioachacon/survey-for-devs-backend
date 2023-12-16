import { DbAddAccount } from "../../data/usecases/add-account/db-add-account";
import { AccountMongoRepository } from "../../infra/database/mongodb/repository/account-repository-adapter";
import { BcryptAdapter } from "../../infra/encryption/bcrypt-adapter";
import { SignUpController } from "../../presentation/controllers/signup/signup-controller";
import { LogControllerDecorator } from "../decorators/log-decorator";
import { makeSignUpValidations } from "./signup-validation";

export const makeSignUpController = () => {
  const AddAccount = new DbAddAccount(
    new BcryptAdapter(12),
    new AccountMongoRepository()
  );

  const validations = makeSignUpValidations();

  const signUpController = new SignUpController(AddAccount, validations);

  return new LogControllerDecorator(signUpController);
};
