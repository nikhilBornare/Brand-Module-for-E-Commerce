import { body } from "express-validator";

export const brandValidationRules = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be a string"),

    body("description")
        .notEmpty()
        .withMessage("Description is required")
        .isString()
        .withMessage("Description must be a string"),

    body("website")
        .notEmpty()
        .withMessage("Website is required")
        .isURL()
        .withMessage("Website must be a valid URL"),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be a valid email address"),

    body("country")
        .notEmpty()
        .withMessage("Country is required")
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
        .notEmpty()
        .withMessage("Available Location is required")
        .isString()
        .withMessage("Available Location must be a string"),

    body("totalProduct")
        .notEmpty()
        .withMessage("Total Product is required")
        .isInt({ min: 0 })
        .withMessage("Total Product must be a non-negative integer"),

    body("rating")
        .notEmpty()
        .withMessage("Rating is required")
        .isFloat({ min: 0, max: 5 })
        .withMessage("Rating must be a number between 0 and 5"),
];
