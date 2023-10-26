import { NextFunction, Request, Response } from "express";

interface CorsMiddleware {
  (req: Request, res: Response, next: NextFunction): void;
}

export const cors: CorsMiddleware = (req, res, next) => {
  res.set("access-control-allow-origin", "*");
  res.set("access-control-allow-methods", "*");
  res.set("access-control-allow-headers", "*");

  next();
};
