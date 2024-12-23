import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((err: any) => {
            // Extract specific field names from 'param' or 'location'
            const field = err.param || err.location ;
            const message = err.msg || "Unknown error";

            return {
                field: field,
                message: message
            };
        });

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
