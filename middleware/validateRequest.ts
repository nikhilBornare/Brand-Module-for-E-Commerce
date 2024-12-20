import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ApplicationError } from "../error-handler/applicationError";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map((err) => err.msg).join(", ");
    return next(new ApplicationError(message, 400));
  }
  next();
};
  