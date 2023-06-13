import { NextFunction } from 'express';
import bcrypt from "bcrypt"
import User from '../../entities/user';
import Booth from '../../entities/booth';
import {getConnection,getRepository,Equal} from 'typeorm';
const userRepo = getRepository(User);
const boothRepo=getRepository(Booth);
import { FindManyOptions  } from 'typeorm';
import AppError from '../../utils/appError';
import AirlineType from '../../entities/airlineType';
import { resourceUsage } from 'process';
export enum UserRole {
  Air_Port_Manager = 'Air_Port_Manager',
  Air_Line_Manager = 'Air_Line_Manager',
  Staff = 'Staff',
}

class UserService {
  static async create(userData: User) {
     const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
      const user = userRepo.create(userData);
      await userRepo.save(user);
      if(user && user.booth!==null){
        const boothId=String(user.booth)
      await boothRepo.update({id:boothId},{isAssigned:true});
      }
      return user;
  }

  static async getAll() {
      const result = await userRepo.find({select:["id","firstName","lastName","email","phone","role"],relations: ['booth',"airLine"]});
      return result;
      
  }
   static async getAirLineManagers() {
      const result = await userRepo.find({where:{role: "Air Line Manager" as UserRole},
      select:["id","firstName","lastName","email","phone","role"],
      relations: ['booth','airLine']});
      return result;
  }

  static async getOne(id: string) {
      const user = await userRepo.findOne({where:{id:id},select:["id","firstName","lastName","email","phone","role"],relations: ['booth','airLine']});
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
static async isAssignedAirLine(airLine:any){
  const result=await userRepo.findOne({where:{airLine:airLine}});
  console.log(result)
  return  result
}
}

export default UserService
