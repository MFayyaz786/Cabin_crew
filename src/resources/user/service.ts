import { getRepository } from 'typeorm';
import { User } from '../../entities/User';

import AppError from '../../utils/helpers/appError';
import { v1 as uuidv1 } from 'uuid';

interface IUser {
  _id: string;
  // Add other fields as needed
}

class UserServices {
  //* CREATE
  static async create(user: Partial<User>): Promise<User> {
    const userRepository = getRepository(User);
    return await userRepository.save(user);
  }

  //* USERS
  static async Users(): Promise<{ users: User[] }> {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    return { users };
  }

  //* USER
//* USER
static async User(userId: string, next: (error: AppError) => void): Promise<{ user: User | undefined }> {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    next(new AppError(`No User found against id ${userId}`, 404));
    return { user: undefined };
  }

  return { user };
}


//* UPDATEME
static async UpdateMe(userId: string, body: Partial<User>, next: (error: AppError) => void): Promise<{ updatedUser: User | undefined }> {
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
//* DELETEME
static async DeleteUser(userId: string, next: (error: AppError) => void): Promise<{ deletedUser: User | undefined }> {
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

export default UserServices;
