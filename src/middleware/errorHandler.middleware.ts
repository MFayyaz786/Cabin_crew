import { NextFunction, Request, Response } from 'express';
import { upperCaseFirst } from 'upper-case-first';
import AppError from '../utils/appError'
import { QueryFailedError } from 'typeorm';
import { EntityMetadataNotFoundError } from 'typeorm/error/EntityMetadataNotFoundError';
export default async (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('ERR CAUGHT IN GLOBAL MIDDLEWARE'.red.bold);
  console.error('ERROR =>',err);
  console.error('ERROR MESSAGE =>'.red.bold,err.message);
  console.error('ERROR NAME =>'.red.bold,err.name);
  console.error('ERROR CODE =>'.red.bold,err.code);
  console.error('ERROR STACK =>'.red.bold,err.stack);



  const handleDuplicateFieldsDB=(err:any):AppError=>{
    const detail = err.detail;
    const field = detail.match(/\((.*?)\)/)[1];
    const errorKey = upperCaseFirst(field);
    return new AppError(`${errorKey} already exists`, 400, true);
  }

  const invalidForeignKey=(err:any):AppError=>{
    const detail = err.detail;
    const field = detail.match(/\((.*?)\)/)[1];
    const errorKey = upperCaseFirst(field);
    return new AppError(`${errorKey} not found`, 400, true);
  }

  const checkNull=(err:any):AppError=>{
    const detail = err.detail;
    const field = detail.match(/\((.*?)\)/)[1];
    const errorKey = upperCaseFirst(field);
    return new AppError(`${errorKey} cannot be null`, 400, true);
  }

  const invalidInput=(err:any):AppError=>{
  // Extract the invalid value from the error message
  const invalidValueMatch = err.message.match(/invalid input syntax for type (\w+): "(.*)"/);
  const invalidType = invalidValueMatch ? invalidValueMatch[1] : "unknown";
  const invalidValue = invalidValueMatch ? invalidValueMatch[2] : "unknown";

  // Depending on the type of the invalid value, generate a different error message
  let errorMessage: string;

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

  return new AppError(errorMessage, 400, true);
  }

  const handleValidationError = (err: any): AppError => {
    const errors =Object.values(err.errors).map((val: any) => val.message)
    return new AppError(errors[0], 400, true);
  };

  const handleError = (err: any):AppError => {
    return new AppError(err.message, 400, true);
  };

   if (err instanceof EntityMetadataNotFoundError) {
    // Handle the EntityMetadataNotFoundError
    console.error('Metadata not found for entity:', err.message);
    // Create an appropriate AppError instance or perform any necessary actions
    err = new AppError('Entity metadata not found', 400, true);
  } 
  //else if (err instanceof QueryFailedError) {
  else if (err.code === '23505') err= handleDuplicateFieldsDB(err);
  else if (err.code==='23503') err= invalidForeignKey(err)
  else if (err.code ==='23502') err= checkNull(err)
  else if (err.code==='22P02') err= invalidInput(err)
  else if (err.name==='validationError') err = handleValidationError(err)
  else if (err.name==='Error') err = handleError(err)
  else if (err instanceof TypeError && err.message.includes("Cannot read properties of undefined (reading 'joinColumns')")) {
    // Handle the specific TypeError
    console.error('TypeError: Cannot read properties of undefined (reading \'joinColumns\')');
    // Create an appropriate AppError instance or perform any necessary actions
    err = new AppError('Cannot read properties of undefined (reading \'joinColumns\')', 400, true);
  }else if (err.message === 'Request failed with status code 401') {
    // Handle the specific error message
    console.error('Request failed with status code 401');
    // Create an appropriate AppError instance or perform any necessary actions
    err = new AppError('Unauthorized', 401, true);
  }else if (err.message === 'Request failed with status code 400') {
    // Handle the specific error message
    console.error('Request failed with status code 400');
    // Create an appropriate AppError instance or perform any necessary actions
    err = new AppError("Request Failed", 400, true);
  }else if (err.message === 'Request failed with status code 500') {
    // Handle the specific error message
    console.error('Request failed with status code 500');
    // Create an appropriate AppError instance or perform any necessary actions
    err = new AppError("Internal Server Error", 500, true);
  }
  else if (err.name === 'UpdateValuesMissingError') {
    // Handle the specific error name
    console.error('UpdateValuesMissingError: Cannot perform update query because update values are not defined');
    // Create an appropriate AppError instance or perform any necessary actions
    err = new AppError('Cannot perform update query because update values are not defined', 400, true);
  }
  else  err = new AppError(err.message, err.statusCode, false);

  if (process.env.NODE_ENV === 'development') {
  return  res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      stack: err.stack
    });
  } else {
  return  res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }
};
