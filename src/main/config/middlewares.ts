import { Express } from "express";
import { bodyParser } from "../middlewares/body-parser";
import { cors } from "../middlewares/cors";
import { contentType } from "../middlewares/content-type";

const setServerMiddlewares = (server: Express) => {
  server.use(bodyParser);
  server.use(cors);
  server.use(contentType);
};

export default setServerMiddlewares;
