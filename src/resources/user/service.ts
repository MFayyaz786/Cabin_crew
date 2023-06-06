import { NextFunction } from 'express';
import User from '../../entities/user';
import {getConnection,getRepository} from 'typeorm';
const userRepo = getRepository(User);
import { FindManyOptions  } from 'typeorm';
import AppError from '../../utils/appError';

// export  const service=  {
//   create:async(userData: User) => {
//     const users =  userRepo.create(userData);
//     await userRepo.save(users);
//     return  users;
//   },
//   getAll:async ()=>{
//     const result=await userRepo.find();
//     return result
//   },
//   getOne: async (id: any) => {
//   const user = await userRepo.findOne({where:{id:id}});
//   return user;
//   },
//   update:async(id:any,userData:User)=>{
//   const result=await userRepo.update({id},userData);
//   return result;
//   },
//   delete:async(id:any)=>{
//     const result=await userRepo.delete({id});
//     console.log("result is",result);
    
//     return result
//   }

// };

class UserService {

  static async create(userData: User) {
      const user = userRepo.create(userData);
      await userRepo.save(user);
      return user;
  }

  static async getAll(query:any) {
      const result = await userRepo.find({where:query});
      return result;
  }

  static async getOne(id: any) {
      const user = await userRepo.findOneBy({id});
      return user;
  }

  static async update(id: any, userData: User,next:NextFunction) {
      await userRepo.update(id, userData);
      const updatedUser = await userRepo.findOneBy({id});
      if(!updatedUser){
        return next(new AppError("No user found with that ID",404));
    }
      return updatedUser;
  }

  static async delete(id: any) {
    const userToDelete = await userRepo.findOne({ where: { id } });

    if (!userToDelete) {
        return false;
    }

    await userRepo.remove(userToDelete);
    return true;
  }
}

export default UserService
