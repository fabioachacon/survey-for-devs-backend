import express from "express";
import setMiddlewares from "./middlewares";
import { setRoutes } from "./routes";

const server = express();

setRoutes(server);
setMiddlewares(server);

export default server;
