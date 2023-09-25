"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode, isOperational = false, stack = '') {
        console.log('AppError =>'.yellow.bold, message);
        console.log('AppError =>'.yellow.bold, statusCode);
        console.log('AppError =>'.yellow.bold, isOperational);
        console.log('AppError =>'.yellow.bold, stack);
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = AppError;
