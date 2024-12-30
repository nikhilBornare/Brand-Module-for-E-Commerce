import { Request, Response, NextFunction } from "express";
import Brand from "../models/brandModel";
import { ApplicationError } from "../error-handler/applicationError";
import { brandSchema } from "../validators/brandValidator";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = brandSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const formattedErrors = error.details.map((detail) => ({
            field: detail.context?.key || "unknown",
            message: detail.message,
        }));
        return next(new ApplicationError("Validation failed", 400, formattedErrors));
    }
    next();
};

// Middleware for checking unique name
export const checkUniqueName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const id = req.params?.id;

        const existingBrand = await Brand.findOne({
            name: name,
            _id: { $ne: id },
        });

        if (existingBrand) {
            return next(new ApplicationError("Name must be unique. This name is already in use.", 400));
        }
        next();
    } catch (err) {
        next(new ApplicationError("Internal server error during unique name validation", 500));
    }
};
