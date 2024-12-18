import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import Brand from "../models/brandModel";

// Custom validator for unique 'name' field
const checkUniqueName = async (value: string) => {
    const existingBrand = await Brand.findOne({ name: value });
    if (existingBrand) {
        throw new Error("Name must be unique. This name is already in use.");
    }
};

export const brandValidationRules = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be a string")
        .custom(checkUniqueName), // Add unique check

    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),

    body("website")
        .optional()
        .isURL()
        .withMessage("Website must be a valid URL"),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be a valid email address"),

    body("country")
        .optional()
        .isString()
        .withMessage("Country must be a string"),

    body("foundedYear")
        .notEmpty()
        .withMessage("Founded Year is required")
        .isInt({ min: 1800, max: new Date().getFullYear() })
        .withMessage(`Founded Year must be a valid year between 1800 and ${new Date().getFullYear()}`),

    body("status")
        .notEmpty()
        .withMessage("Status is required")
        .isIn(["Active", "Inactive"])
        .withMessage("Status must be either 'Active' or 'Inactive'"),

    body("availableLocation")
        .optional()
        .isString()
        .withMessage("Available Location must be a string"),

    body("totalProduct")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Total Product must be a non-negative integer"),

    body("rating")
        .notEmpty()
        .withMessage("Rating is required")
        .isFloat({ min: 0, max: 5 })
        .withMessage("Rating must be a number between 0 and 5"),
];

// Middleware to validate results
export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

// Error handler middleware for duplicate key errors
// export const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
//     if (err && err.code === 11000) { // MongoDB duplicate key error
//         const field = Object.keys(err.keyPattern)[0];
//         return res.status(400).json({
//             success: false,
//             error: {
//                 message: `${field.charAt(0).toUpperCase() + field.slice(1)} must be unique. The value '${err.keyValue[field]}' is already in use.`,
//                 statusCode: 400,
//             },
//         });
//     }
//     next(err); // Pass other errors to the default error handler
// };
