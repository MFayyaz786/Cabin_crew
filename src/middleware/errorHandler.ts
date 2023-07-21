import { NextFunction, Request, Response } from "express";
export default async function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err && err.code === "23505") {
    // PostgreSQL unique constraint violation error
    let errorKey = Object.keys(err["keyValue"]).toString();
    errorKey = errorKey.charAt(0).toUpperCase() + errorKey.slice(1);
    return res.status(400).json({ msg: `${errorKey} already exists` });
  }

  if (err.name === "ValidationError") {
    // TypeORM validation error
    const validationErrors = Object.values(err.errors).map((val: any) => val.message);
    return res.status(400).json({ msg: validationErrors });
  }

  // Generic error response
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({ msg: err.message || "Something went wrong" });
}

// CustomError.ts
export class CustomError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
