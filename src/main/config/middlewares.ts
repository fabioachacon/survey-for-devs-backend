import { Express } from "express";
import { bodyParser } from "../middlewares/parser/body-parser";
import { cors } from "../middlewares/cors/cors";

const setServerMiddlewares = (server: Express) => {
  server.use(bodyParser);
  server.use(cors);
};

export default setServerMiddlewares;
