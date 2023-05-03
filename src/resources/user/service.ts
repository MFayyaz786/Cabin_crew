import { NextFunction } from 'express';
const {getConnection, getRepository } = require('typeorm');
const { User } = require('./userEntity');
const AppError = require('../../utils/helpers/appError');
const { v1: uuidv1 } = require('uuid');

class UserServices {
  //* CREATE
  static async create(user:any) {
    const connection = getConnection(); // Get the connection
    const userRepository =connection.getRepository(User);
    return await userRepository.save(user);
  }

  //* USERS
  static async Users() {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    return { users };
  }

  //* USER
  static async User(userId:any, next:NextFunction) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      next(new AppError(`No User found against id ${userId}`, 404));
      return { user: undefined };
    }

    return { user };
  }

  //* UPDATEME
  static async UpdateMe(userId:any, body:any, next:NextFunction) {
    const userRepository = getRepository(User);
    const userToUpdate = await userRepository.findOne({ where: { id: userId } });

    if (!userToUpdate) {
      next(new AppError(`Can't find any user with id ${userId}`, 404));
      return { updatedUser: undefined };
    }

    const updatedUser = await userRepository.save({ ...userToUpdate, ...body });
    return { updatedUser };
  }

  //* DELETEME
  static async DeleteUser(userId:any, next:NextFunction) {
    const userRepository = getRepository(User);
    const userToDelete = await userRepository.findOne({ where: { id: userId } });

    if (!userToDelete) {
      next(new AppError(`No User found against id ${userId}`, 404));
      return { deletedUser: undefined };
    }

    const deletedUser = await userRepository.remove(userToDelete);
    return { deletedUser };
  }
}

module.exports = UserServices;
