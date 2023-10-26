import { Express } from "express";
import { bodyParser } from "../middlewares/parser/body-parser";

const setServerMiddlewares = (server: Express) => {
  server.use(bodyParser);
};

export default setServerMiddlewares;
