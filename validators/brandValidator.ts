import Joi from "joi";

// Define validation schema
export const brandSchema = Joi.object({
    name: Joi.string()
        .trim()
        .pattern(/^[A-Za-z0-9\s]*$/)
        .required()
        .messages({
            "string.empty": "Name is required",
            "string.pattern.base": "Special characters are not allowed",
        }),

    description: Joi.string().optional().messages({
        "string.base": "Description must be a string",  
    }),

    website: Joi.string().uri().optional().messages({
        "string.uri": "Website must be a valid URL",
    }),

    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
    }),

    country: Joi.string().optional().messages({
        "string.base": "Country must be a string",
    }),

    foundedYear: Joi.number()
        .integer()
        .min(1800)
        .max(new Date().getFullYear())
        .required()
        .messages({
            "number.base": "Founded Year must be a valid number",
            "number.min": `Founded Year must be a valid year between 1800 and ${new Date().getFullYear()}`,
            "number.max": `Founded Year must be a valid year between 1800 and ${new Date().getFullYear()}`,
        }),

    status: Joi.string()
        .valid("Active", "Inactive")
        .required()
        .messages({
            "any.only": "Status must be either 'Active' or 'Inactive'",
            "string.empty": "Status is required",
        }),

    availableLocation: Joi.string().optional().messages({
        "string.base": "Available Location must be a string",
    }),

    totalProduct: Joi.number().integer().min(0).optional().messages({
        "number.base": "Total Product must be a non-negative integer",
    }),

    rating: Joi.number()
        .min(0)
        .max(5)
        .required()
        .messages({
            "number.base": "Rating must be a number between 0 and 5",
            "number.min": "Rating must be a number between 0 and 5",
            "number.max": "Rating must be a number between 0 and 5",
            "any.required": "Rating is required",
        }),
});
