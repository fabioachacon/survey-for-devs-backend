import express from "express";
import setMiddlewares from "./middlewares";

const server = express();

setMiddlewares(server);

export default server;
