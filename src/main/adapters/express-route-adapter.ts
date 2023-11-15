import { Controller } from "../../presentation/protocols/controller";
import { Request, Response } from "express";
import { HttpRequest } from "../../presentation/protocols/http";

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      headers: req.headers,
    };

    const response = await controller.handle(httpRequest);
    if (response) {
      res.status(response.statusCode).json(response.body);
    }
  };
};
