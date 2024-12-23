import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((err: any) => ({
            field: err.param, 
            message: err.msg || "Unknown error"
        }));

         res.status(400).json({
            success: false,
            error: {
                message: "Validation failed",
                statusCode: 400,
                details: formattedErrors
            }
        });
    }
    return;
};
