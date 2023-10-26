import { NextFunction, Request, Response } from "express";

interface Middleware {
  (req: Request, res: Response, next: NextFunction): void;
}

export const contentType: Middleware = (req, res, next) => {
  res.type("json");

  next();
};
