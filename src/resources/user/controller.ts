import { Request,Response,NextFunction } from 'express';
import catchAsync = require('../../utils/helpers/catchAsync');
const UserServices = require('./service');
const { updateValidation } = require('./validation');
const AppError = require('../../utils/helpers/appError');

export const createUser = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  const newUser = await UserServices.create(req.body);
  res.status(201).json({ newUser });
});

export const getAllUsers = catchAsync(async (req:Request, res:Response) => {
  const { users } = await UserServices.Users();

  res.status(200).json({
    status: 'success',
    results: users.length,
    users,
  });
});

export const getUser = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  const { user } = await UserServices.User(req.params.id, next);

  res.status(200).json({
    status: 'success',
    user,
  });
});

export const updateMe = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  const validate = updateValidation.validate(req.body);
  if (validate.error) {
    return next(new AppError(validate.error.message, 400));
  }

  const { updatedUser } = await UserServices.UpdateMe(
    req.params._id,
    req.body,
    next
  );

  res.status(200).json({
    status: 'success',
    user: updatedUser,
  });
});

export const updateUser = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  const validate = updateValidation.validate(req.body);
  if (validate.error) {
    return next(new AppError(validate.error.message, 400));
  }

  const { updatedUser } = await UserServices.UpdateMe(
    req.params._id,
    req.body,
    next
  );

  res.status(200).json({
    status: 'success',
    user: updatedUser,
  });
});

export const deleteUser = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  const { deletedUser } = await UserServices.DeleteUser(req.params._id, next);

  res.status(200).json({
    status: 'success',
    user: deletedUser,
  });
});
