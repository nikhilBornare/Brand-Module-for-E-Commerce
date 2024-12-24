import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ApplicationError } from "../error-handler/applicationError";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
    //  field: "param" in err ? err.param:"unknown",
      message: err.msg,
    }));
    return next(new ApplicationError("Validation failed", 400, formattedErrors));
  }
  next();
};
