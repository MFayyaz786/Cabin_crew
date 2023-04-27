// // apply restricting to specific members
// //  roles is an array like ['admin','user'] using res-parameter syntax

// import { Request, Response, NextFunction } from 'express';
// import ApiError from '@/utils/helpers/appError';

// export default (...role: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     console.log('role', role);
//     console.log('req.user.role', req.user.role);
//     if (!role.includes(req.user.role)) {
//       return next(
//         new ApiError('You do not have permission to perform this action', 403)
//       );
//     }
//     next();
//   };
// };
