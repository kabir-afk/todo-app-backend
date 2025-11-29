import {} from "express";
import { ErrorLogger } from "../utils/errorLogger.js";
export class AppError extends Error {
    statusCode;
    isOperational;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
export const errorHandler = async (err, req, res, next) => {
    let statusCode = 500;
    let message = err.message || "Internal Server Error";
    if (err instanceof AppError) {
        statusCode = err.statusCode;
    }
    await ErrorLogger.logError(err, req, statusCode);
    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && {
            stack: err.stack,
            error: err,
        }),
    });
};
export const notFoundHandler = (req, res, next) => {
    const error = new AppError(`Route ${req.originalUrl} not found`, 404);
    next(error);
};
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
//# sourceMappingURL=errorHandler.js.map