// import { Request, Response, NextFunction } from 'express';
// import catchAsync from '../../utils/helpers/catchAsync';
// import UserServices from './service';
// import { updateValidation } from './validation';
// import AppError from '../../utils/helpers/appError';
// import { RequestHandler } from 'express';

// export const createUser: RequestHandler = catchAsync(async (req, res, next) => {
//   const newUser = await UserServices.create(req.body);
//   res.status(201).json(newUser);
// });

// export const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
//   const { users } = await UserServices.Users();

//   res.status(200).json({
//     status: 'success',
//     results: users.length,
//     users,
//   });
// });

// export const getUser: RequestHandler = catchAsync(async (req, res, next) => {
//   const { user } = await UserServices.User(req.params.id, next);

//   res.status(200).json({
//     status: 'success',
//     user,
//   });
// });

// export const updateMe: RequestHandler = catchAsync(async (req, res, next) => {
//   const validate = updateValidation.validate(req.body);
//   if (validate.error) {
//     return next(new AppError(validate.error.message, 400));
//   }

//   const { updatedUser } = await UserServices.UpdateMe(
//     req.params._id,
//     req.body,
//     next
//   );

//   res.status(200).json({
//     status: 'success',
//     user: updatedUser,
//   });
// });

// export const updateUser: RequestHandler = catchAsync(async (req, res, next) => {
//   const validate = updateValidation.validate(req.body);
//   if (validate.error) {
//     return next(new AppError(validate.error.message, 400));
//   }

//   const { updatedUser } = await UserServices.UpdateMe(
//     req.params._id,
//     req.body,
//     next
//   );

//   res.status(200).json({
//     status: 'success',
//     user: updatedUser,
//   });
// });

// export const deleteUser: RequestHandler = catchAsync(async (req, res, next) => {
//   const { deletedUser } = await UserServices.DeleteUser(req.params._id, next);

//   res.status(200).json({
//     status: 'success',
//     user: deletedUser,
//   });
// });
