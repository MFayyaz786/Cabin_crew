import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import User from '../entities/user';
import { verifyToken } from '../utils/token';
import { getRepository } from 'typeorm';


// // Protecting Routes
// const authenticateToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   // Get the token and check if it exists
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     return next(new AppError('You are not logged in', 401));
//   }

//   // Validate the token
//   const decode = await promisify(jwt.verify)(token,process.env.JWT_SECRET);

//   // Check if user exists
//   const currentUser = await User.findOne(decode.id);
//   if (!currentUser) {
//     return next(
//       new AppError('User belonging to this token does not exist', 401)
//     );
//   }

//   req.user = currentUser;
//   next();
// });

// export default authenticateToken;

// In your middleware
declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}

export default  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Get the token if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('you are not login ', 401));
  }

  // Validate the token
  let payload: any = null;
  try {
    payload = await verifyToken(token);
  } catch (err) {
    return next(new AppError('Invalid token!', 401));
  }

  // Check if user exists
  const currentUser = await getRepository(User).findOne(payload.id);
  if (!currentUser) {
    return next(
      new AppError('User belong to this token does not exists ', 401)
    );
  }

  req.user = currentUser;
  next();
});
