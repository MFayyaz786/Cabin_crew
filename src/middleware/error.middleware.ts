import AppError from '../utils/helpers/appError';
import { Response, NextFunction,ErrorRequestHandler } from 'express';
import { Request } from 'express-serve-static-core';

export type ErrorHandlingMiddleware = ErrorRequestHandler;


const handleCastErrorDB = (err: AppError): AppError => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (errmsg: string): AppError => {
  errmsg = errmsg as string;

  const key = errmsg && errmsg.match(/key: \{(.*?)\:/)?.[1]?.trim();
  console.log(key); // Output: "phone"

  const value =
    errmsg && errmsg.match(/(["'])(\\?.)*?\1/)?.[0]?.replace(/"/g, '');
  console.log('value', value);

  const message = `Duplicate field ${key}: ${value}. Please use another value!`;
  console.log('message', message);
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: AppError): AppError => {
  if (err.errors && Array.isArray(err.errors)) {
    const errors = err.errors.map((el: { message: string }) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
  }
  return new AppError(`Invalid input data. ${err.message}`, 400);
};

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational || err.statusCode === 500 || err.statusCode === 502) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    // console.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

export const globalErrorHandler:ErrorHandlingMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(err.stack);
  console.log('ERR CAUGHT IN GLOBAL MIDDLEWARE');
  console.log(err);
  console.log('err.message', err.message);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = err;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.message?.startsWith('E11000') || error.code === 11000)
      error = handleDuplicateFieldsDB(error.message);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    // Check axios error
    if (error.response) {
      console.log('error.response', error.response);
      err.message =
        error.response?.data?.message ||
        error.message ||
        'Something went wrong';
    }

    if (error.statusCode !== 500 && error.statusCode !== 502)
      error.isOperational = true;

    sendErrorProd(error, res);
  }
}

export default globalErrorHandler;
