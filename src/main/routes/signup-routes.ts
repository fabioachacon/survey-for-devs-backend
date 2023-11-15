import { Router } from "express";
import { makeSignUpController } from "../factories/signup";
import { adaptRoute } from "../adapters/express-route-adapter";

export default (router: Router) => {
  const controller = makeSignUpController();
  router.post("/signup", adaptRoute(controller));
};
