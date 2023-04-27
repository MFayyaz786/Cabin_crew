// import { Request, Response, NextFunction } from 'express';
import { Request, Response, NextFunction } from 'express-serve-static-core';

function catchAsync<T extends (req: Request, res: Response, next: NextFunction) => Promise<any>>(
  fn: T
): T {
  return ((
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  }) as T;
}

export default catchAsync;
