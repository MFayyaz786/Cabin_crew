import { NextFunction } from 'express';
import User from '../../entities/user';
import {getConnection,getRepository,Equal} from 'typeorm';
const userRepo = getRepository(User);
import { FindManyOptions  } from 'typeorm';
import AppError from '../../utils/appError';
export enum UserRole {
  Air_Port_Manager = 'Air_Port_Manager',
  Air_Line_Manager = 'Air_Line_Manager',
  Staff = 'Staff',
}
class UserService {

  static async create(userData: User) {
      const user = userRepo.create(userData);
      await userRepo.save(user);
      return user;
  }

  static async getAll() {
      const result = await userRepo.find({select:["id","firstName","lastName","email","phone","role"],relations: ['booth']});
      return result;
  }
   static async getAirLineManagers() {
      const result = await userRepo.find({where:{role: "Air Line Manager" as UserRole},
      select:["id","firstName","lastName","email","phone","role"],
      relations: ['booth']});
      return result;
  }

  static async getOne(id: string) {
      const user = await userRepo.findOne({where:{id:id},select:["id","firstName","lastName","email","phone","role"],relations: ['booth']});
      return user;
  }

static async update(id:string,userData:User){
const result=await userRepo.update({id},userData);
  console.log("result is",result);

return result;
}

  static async delete(id:string){
  const result=await userRepo.delete({id});
  
  return result
}

}

export default UserService
