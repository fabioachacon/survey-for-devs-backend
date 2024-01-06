import { CompareFieldsValidation } from "../../presentation/validations/compared-fields-validation";
import { EmailValidation } from "../../presentation/validations/email-validation";
import { RequiredFieldValidation } from "../../presentation/validations/required-field-validation";
import { ValidationComposite } from "../../presentation/validations/validation-composite";
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter";

export const makeSignUpValidations = () => {
  const requiredFieldValidation = mekaRequiredFeildValidation([
    "name",
    "email",
    "password",
    "passwordConfirmation",
  ]);

  const compareFieldsValidation = makeCompareFieldsValidation(
    "password",
    "passwordConfirmation"
  );

  const emailValidation = makeEmailValidation();

  return new ValidationComposite([
    ...requiredFieldValidation,
    compareFieldsValidation,
    emailValidation,
  ]);
};

const mekaRequiredFeildValidation = (fields: string[]) => {
  return fields.map((field) => new RequiredFieldValidation(field));
};

const makeCompareFieldsValidation = (field: string, toCompare: string) => {
  return new CompareFieldsValidation(field, toCompare);
};

const makeEmailValidation = () => {
  const emailValidator = new EmailValidatorAdapter();

  return new EmailValidation("email", emailValidator);
};
