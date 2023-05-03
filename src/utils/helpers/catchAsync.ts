import { Request, Response, NextFunction } from 'express';

interface CatchAsyncFn {
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}

const catchAsync: CatchAsyncFn = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export = catchAsync;
