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
      name: "any_name",
      email: "any_email",
      password: "any_password",
      passwordConfirmation: "any_password",
    },
  };
};
