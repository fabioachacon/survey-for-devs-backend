export class MissingParamError extends Error {
  constructor(name: string) {
    super(`Missing param: ${name}`);

    this.name = "MissingParamError";
  }
}
