"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const upper_case_first_1 = require("upper-case-first");
const appError_1 = __importDefault(require("../utils/appError"));
const typeorm_1 = require("typeorm");
const EntityMetadataNotFoundError_1 = require("typeorm/error/EntityMetadataNotFoundError");
const class_validator_1 = require("class-validator");
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.default = async (err, req, res, next) => {
    console.log('ERR CAUGHT IN GLOBAL MIDDLEWARE'.red.bold);
    console.error('ERROR =>', err);
    console.error('ERROR MESSAGE =>'.red.bold, err.message);
    console.error('ERROR NAME =>'.red.bold, err.name);
    console.error('ERROR CODE =>'.red.bold, err.code);
    console.error('ERROR STACK =>'.red.bold, err.stack);
    const handleDuplicateFieldsDB = (err) => {
        if (err.detail) {
            const field = err.detail.match(/\((.*?)\)/)[1];
            const errorKey = (0, upper_case_first_1.upperCaseFirst)(field);
            return new appError_1.default(`${errorKey} already exists`, 400, true);
        }
        return new appError_1.default(err, 400, true);
    };
    const invalidForeignKey = (err) => {
        if (err.detail) {
            const field = err.detail.match(/\((.*?)\)/)[1];
            const errorKey = (0, upper_case_first_1.upperCaseFirst)(field);
            return new appError_1.default(`${errorKey} not found`, 400, true);
        }
        return new appError_1.default(err, 
        //'Invalid foreign key error',
        400, true);
    };
    const checkNull = (err) => {
        if (err.detail) {
            const field = err.detail.match(/\((.*?)\)/)[1];
            const errorKey = (0, upper_case_first_1.upperCaseFirst)(field);
            return new appError_1.default(`${errorKey} cannot be null`, 400, true);
        }
        return new appError_1.default(err, 
        //'Null value error',
        400, true);
    };
    class DatabaseError extends Error {
        constructor(message) {
            super(message);
            this.name = 'DatabaseError';
        }
    }
    const invalidInput = (err) => {
        const invalidValueMatch = err.message.match(/invalid input syntax for type (\w+): "(.*)"/);
        const invalidType = invalidValueMatch ? invalidValueMatch[1] : 'unknown';
        const invalidValue = invalidValueMatch ? invalidValueMatch[2] : 'unknown';
        let errorMessage;
        switch (invalidType.toLowerCase()) {
            case 'uuid':
                errorMessage = `Invalid UUID provided: ${invalidValue}`;
                break;
            case 'integer':
            case 'int':
            case 'number':
                errorMessage = `Invalid number provided: ${invalidValue}`;
                break;
            case 'date':
            case 'datetime':
            case 'timestamp':
                errorMessage = `Invalid date provided: ${invalidValue}`;
                break;
            default:
                errorMessage = `Invalid ${invalidType} value provided: ${invalidValue}`;
                break;
        }
        return new appError_1.default(errorMessage, 400, true);
    };
    const handleValidationError = (err) => {
        const errors = Object.values(err.errors).map((val) => val.message);
        return new appError_1.default(errors[0], 400, true);
    };
    // if (err instanceof ValidationError) {
    //     err = handleValidationError(err);
    //   }
    const handleError = (err) => {
        return new appError_1.default(err.message, 400, true);
    };
    // Default error object to return
    const errorResponse = {
        message: 'Internal Server Error',
    };
    //  if (err.name === 'ValidationError') {
    //     // TypeORM validation error
    //     const validationErrors = Object.values(err.errors).map((val: any) => val.message);
    //     err=new AppError( validationErrors ,400,true);
    //   }else
    if (err instanceof EntityMetadataNotFoundError_1.EntityMetadataNotFoundError) {
        console.error('Metadata not found for entity:', err.message);
        err = new appError_1.default('Entity metadata not found', 400, true);
    }
    else if (err instanceof typeorm_1.QueryFailedError) {
        // if (err.message.includes('column')) {
        err = handleDuplicateFieldsDB(err);
        // } else {
        //   err = new AppError(`${errorKey} already exists`, 400, true);
        // }
    }
    else if (err.code === '23505') {
        err = handleDuplicateFieldsDB(err);
    }
    else if (err.code === '23503') {
        err = invalidForeignKey(err);
    }
    else if (err.code === '23502') {
        err = checkNull(err);
    }
    else if (err.code === '22P02') {
        err = invalidInput(err);
    }
    else if (err.name === 'Error') {
        err = handleError(err);
    }
    else if (err.message === 'Request failed with status code 401') {
        console.error('Request failed with status code 401');
        err = new appError_1.default('Unauthorized', 401, true);
    }
    else if (err.message === 'Request failed with status code 400') {
        console.error('Request failed with status code 400');
        err = new appError_1.default('Request Failed', 400, true);
    }
    else if (err.message === 'Request failed with status code 500') {
        console.error('Request failed with status code 500');
        err = new appError_1.default('Internal Server Error', 500, true);
    }
    else if (err.name === 'UpdateValuesMissingError') {
        console.error('UpdateValuesMissingError: Cannot perform update query because update values are not defined');
        err = new appError_1.default('Cannot perform update query because update values are not defined', 400, true);
    }
    else if (err instanceof CustomError) {
        // Handle specific error types if needed
        errorResponse.message = err.message;
        err = new appError_1.default(errorResponse.message, 500, true);
        // You can also set a specific status code for this type of error if needed
        // res.status(400);
    }
    else if (err instanceof DatabaseError) {
        // Handle database-specific errors
        console.error('Database error:', err);
        err = new appError_1.default('Database operation failed.', 500, true);
    }
    else if (err.name === 'QueryFailedError' || err.name === 'EntityNotFoundError') {
        // Handle TypeORM database errors (you can add more specific error checks if needed)
        errorResponse.message = 'Database Error';
        err = new appError_1.default(errorResponse.message, 500, true);
        // You can also set a specific status code for database errors if needed
        // res.status(500);
    }
    else if (err instanceof ApiError) {
        // Handle custom AppError (e.g., validation errors, business logic errors)
        err = new appError_1.default(err.message, err.statusCode);
    }
    else if (err.isAxiosError) {
        // Handle AxiosError (e.g., HTTP request errors)
        const axiosError = err;
        err = new appError_1.default('Request failed.', axiosError.response?.status || 500);
    }
    else if (err instanceof class_validator_1.ValidationError) {
        err = handleValidationError(err);
    }
    else {
        err = new appError_1.default(err.message, err.statusCode, false);
    }
    const responsePayload = {
        status: 'error',
        message: err.message,
    };
    if (process.env.NODE_ENV === 'development') {
        responsePayload['stack'] = err.stack;
    }
    return res.status(err.statusCode).json(responsePayload);
};
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CustomError';
    }
}
exports.CustomError = CustomError;
// import { NextFunction, Request, Response } from 'express';
// import { upperCaseFirst } from 'upper-case-first';
// import AppError from '../utils/appError'
// import { QueryFailedError } from 'typeorm';
// import { EntityMetadataNotFoundError } from 'typeorm/error/EntityMetadataNotFoundError';
// export default async (err: any, req: Request, res: Response, next: NextFunction) => {
//   console.log('ERR CAUGHT IN GLOBAL MIDDLEWARE'.red.bold);
//   console.error('ERROR =>',err);
//   console.error('ERROR MESSAGE =>'.red.bold,err.message);
//   console.error('ERROR NAME =>'.red.bold,err.name);
//   console.error('ERROR CODE =>'.red.bold,err.code);
//   console.error('ERROR STACK =>'.red.bold,err.stack);
//   const handleDuplicateFieldsDB=(err:any):AppError=>{
//     const detail = err.detail;
//     const field = detail.match(/\((.*?)\)/)[1];
//     const errorKey = upperCaseFirst(field);
//     return new AppError(`${errorKey} already exists`, 400, true);
//   }
//   const invalidForeignKey=(err:any):AppError=>{
//     const detail = err.detail;
//     const field = detail.match(/\((.*?)\)/)[1];
//     const errorKey = upperCaseFirst(field);
//     return new AppError(`${errorKey} not found`, 400, true);
//   }
//   const checkNull=(err:any):AppError=>{
//     const detail = err.detail;
//     const field = detail.match(/\((.*?)\)/)[1];
//     const errorKey = upperCaseFirst(field);
//     return new AppError(`${errorKey} cannot be null`, 400, true);
//   }
//   const invalidInput=(err:any):AppError=>{
//   // Extract the invalid value from the error message
//   const invalidValueMatch = err.message.match(/invalid input syntax for type (\w+): "(.*)"/);
//   const invalidType = invalidValueMatch ? invalidValueMatch[1] : "unknown";
//   const invalidValue = invalidValueMatch ? invalidValueMatch[2] : "unknown";
//   // Depending on the type of the invalid value, generate a different error message
//   let errorMessage: string;
//   switch (invalidType.toLowerCase()) {
//     case 'uuid':
//       errorMessage = `Invalid UUID provided: ${invalidValue}`;
//       break;
//     case 'integer':
//     case 'int':
//     case 'number':
//       errorMessage = `Invalid number provided: ${invalidValue}`;
//       break;
//     case 'date':
//     case 'datetime':
//     case 'timestamp':
//       errorMessage = `Invalid date provided: ${invalidValue}`;
//       break;
//     default:
//       errorMessage = `Invalid ${invalidType} value provided: ${invalidValue}`;
//       break;
//   }
//   return new AppError(errorMessage, 400, true);
//   }
//   const handleValidationError = (err: any): AppError => {
//     const errors =Object.values(err.errors).map((val: any) => val.message)
//     return new AppError(errors[0], 400, true);
//   };
//   const handleError = (err: any):AppError => {
//     return new AppError(err.message, 400, true);
//   };
//    if (err instanceof EntityMetadataNotFoundError) {
//     // Handle the EntityMetadataNotFoundError
//     console.error('Metadata not found for entity:', err.message);
//     // Create an appropriate AppError instance or perform any necessary actions
//     err = new AppError('Entity metadata not found', 400, true);
//   } 
//   //else if (err instanceof QueryFailedError) {
//   else if (err.code === '23505') err= handleDuplicateFieldsDB(err);
//   else if (err.code==='23503') err= invalidForeignKey(err)
//   else if (err.code ==='23502') err= checkNull(err)
//   else if (err.code==='22P02') err= invalidInput(err)
//   else if (err.name==='validationError') err = handleValidationError(err)
//   else if (err.name==='Error') err = handleError(err)
//   else if (err instanceof TypeError && err.message.includes("Cannot read properties of undefined (reading 'joinColumns')")) {
//     // Handle the specific TypeError
//     console.error('TypeError: Cannot read properties of undefined (reading \'joinColumns\')');
//     // Create an appropriate AppError instance or perform any necessary actions
//     err = new AppError('Cannot read properties of undefined (reading \'joinColumns\')', 400, true);
//   }else if (err.message === 'Request failed with status code 401') {
//     // Handle the specific error message
//     console.error('Request failed with status code 401');
//     // Create an appropriate AppError instance or perform any necessary actions
//     err = new AppError('Unauthorized', 401, true);
//   }else if (err.message === 'Request failed with status code 400') {
//     // Handle the specific error message
//     console.error('Request failed with status code 400');
//     // Create an appropriate AppError instance or perform any necessary actions
//     err = new AppError("Request Failed", 400, true);
//   }else if (err.message === 'Request failed with status code 500') {
//     // Handle the specific error message
//     console.error('Request failed with status code 500');
//     // Create an appropriate AppError instance or perform any necessary actions
//     err = new AppError("Internal Server Error", 500, true);
//   }
//   else if (err.name === 'UpdateValuesMissingError') {
//     // Handle the specific error name
//     console.error('UpdateValuesMissingError: Cannot perform update query because update values are not defined');
//     // Create an appropriate AppError instance or perform any necessary actions
//     err = new AppError('Cannot perform update query because update values are not defined', 400, true);
//   }
//   else  err = new AppError(err.message, err.statusCode, false);
//   if (process.env.NODE_ENV === 'development') {
//   return  res.status(err.statusCode).json({
//       status: 'error',
//       message: err.message,
//       stack: err.stack
//     });
//   } else {
//   return  res.status(err.statusCode).json({
//       status: 'error',
//       message: err.message
//     });
//   }
// };
