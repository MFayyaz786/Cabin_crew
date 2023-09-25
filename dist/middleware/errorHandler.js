"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
async function errorHandler(err, req, res, next) {
    console.error(err);
    if (err && err.code === "23505") {
        // PostgreSQL unique constraint violation error
        let errorKey = Object.keys(err["keyValue"]).toString();
        errorKey = errorKey.charAt(0).toUpperCase() + errorKey.slice(1);
        return res.status(400).json({ msg: `${errorKey} already exists` });
    }
    if (err.name === "ValidationError") {
        // TypeORM validation error
        const validationErrors = Object.values(err.errors).map((val) => val.message);
        return res.status(400).json({ msg: validationErrors });
    }
    // Generic error response
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ msg: err.message || "Something went wrong" });
}
exports.default = errorHandler;
// CustomError.ts
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.CustomError = CustomError;
