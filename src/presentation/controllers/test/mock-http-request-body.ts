type RequestBody = {
  body: {
    name?: string;
    email?: string;
    password?: string;
    passwordConfirmation?: string;
  };
};

export const getMockedHttpRequestBody = (): RequestBody => {
  return {
    body: {
      name: "jon",
      email: "test@mail.com",
      password: "any_password",
      passwordConfirmation: "any_confirmation",
    },
  };
};
