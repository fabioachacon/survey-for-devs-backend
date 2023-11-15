import { DbAddAccount } from "../../data/usecases/add-account/db-add-account";
import { AccountMongoRepository } from "../../infra/database/mongodb/repository/account-repository-adapter";
import { BcryptAdapter } from "../../infra/encryption/bcrypt-adapter";
import { SignUpController } from "../../presentation/controllers/signup/signup-controller";
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter";
import { LogControllerDecorator } from "../decorators/log-decorator";

export const makeSignUpController = () => {
  const AddAccount = new DbAddAccount(
    new BcryptAdapter(12),
    new AccountMongoRepository()
  );

  const emailValidator = new EmailValidatorAdapter();
  const signUpController = new SignUpController(emailValidator, AddAccount);

  return new LogControllerDecorator(signUpController);
};
