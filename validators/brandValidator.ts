import { body, validationResult,CustomValidator } from "express-validator";
import { Request, Response, NextFunction } from "express";
import Brand from "../models/brandModel";


const checkUniqueName: CustomValidator = async (value: string, { req }) => {
    const id = req.params?.id;  
    const existingBrand = await Brand.findOne({ name: value, _id: { $ne: id } });
    if (existingBrand) {
        throw new Error("Name must be unique. This name is already in use.");
    }
};


// function specialCondition(): any {
//     const alpha = /[^A-Za-z0-9]/
//     if (alpha) return;
// }


export const brandValidationRules = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isString().withMessage("Name must be a string")
        .custom(checkUniqueName)
        .custom((value) => {
            const specialCharacters = /^[A-Za-z0-9]*$/;
            if (!specialCharacters.test(value)) {
                throw new Error("Special characters are not allowed");
            }
            return true;
        }),

    body("description")
        .optional()
        .isString().withMessage("Description must be a string"),

    body("website")
        .optional()
        .isURL().withMessage("Website must be a valid URL"),

    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email must be a valid email address"),

    body("country")
        .optional()
        .isString().withMessage("Country must be a string"),

    body("foundedYear")
        .notEmpty().withMessage("Founded Year is required")
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

