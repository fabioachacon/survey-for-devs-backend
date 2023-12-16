import { InvalidParamError } from "../errors/InvalidParamError";
import { Validation } from "../protocols/validation";

export class CompareFieldsValidation implements Validation {
  private readonly field: string;
  private readonly toCompare: string;

  constructor(field: string, toCompare: string) {
    this.field = field;
    this.toCompare = toCompare;
  }

  validate(value: any): Error | null | undefined {
    if (value[this.field] !== value[this.toCompare]) {
      return new InvalidParamError(this.toCompare);
    }
  }
}
