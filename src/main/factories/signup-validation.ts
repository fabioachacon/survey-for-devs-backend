import { CompareFieldsValidation } from "../../presentation/validations/compared-fields-validation";
import { RequiredFieldValidation } from "../../presentation/validations/required-field-validation";
import { ValidationComposite } from "../../presentation/validations/validation-composite";

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

  return new ValidationComposite([
    ...requiredFieldValidation,
    compareFieldsValidation,
  ]);
};

const mekaRequiredFeildValidation = (fields: string[]) => {
  return fields.map((field) => new RequiredFieldValidation(field));
};

const makeCompareFieldsValidation = (field: string, toCompare: string) => {
  return new CompareFieldsValidation(field, toCompare);
};
