// import { Request, Response, NextFunction } from 'express';
// import token from '@/utils/token';
// import UserModel from '@/resources/user/entity';
// import Token from '@/utils/interfaces/token.interface';
// import jwt from 'jsonwebtoken';
// import ApiError from '@/utils/helpers/appError';

// async function authenticatedMiddleware(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<Response | void> {
//   const bearer = req.headers.authorization;
//   console.log('bearer', bearer);

//   if (!bearer || !bearer.startsWith('Bearer ')) {
//     return next(new ApiError('You must login first', 401));
//   }

//   const bearerToken = bearer.split('Bearer ')[1].trim();
//   console.log('bearerToken', bearerToken);
//   try {
//     const payload: Token = await token.verifyToken(bearerToken);

//     console.log('payload.id', payload.id);

//     console.log('here');
//     const user = await UserModel.findOne(payload.id, { select: ['id', 'firstName', 'lastName', 'email', 'phone', 'role', 'isActivated', 'isEmailVerified', 'isPhoneVerified', 'phoneVerificationCode', 'activationCode', 'passwordResetCode', 'passwordResetExpires'] });

//     if (!user) {
//       return next(new ApiError('You must login first', 401));
//     }

//     req.user = user;

//     return next();
//   } catch (error) {
//     console.log('error', error);
//     return res
//       .status(401)
//       .json({ message: 'You must login first', status: 401 });
//   }
// }

// export default authenticatedMiddleware;
