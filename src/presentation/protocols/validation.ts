export interface Validation {
  validate(value: any): Error | null;
}
