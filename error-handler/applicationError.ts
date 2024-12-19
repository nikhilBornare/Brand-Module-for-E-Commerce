import { Request, Response, NextFunction } from "express";

// Custom Error Class
export class ApplicationError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}
// Error Handling Middleware
export const errorHandler = (
    err: ApplicationError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;

    const message = err.message || "Internal Server Error";

    // Send an error response
    res.status(statusCode).json({
        success: false,
        error: {
            message: message,
            statusCode: statusCode,
        },
    });
};
