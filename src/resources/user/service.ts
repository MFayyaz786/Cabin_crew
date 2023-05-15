import User from '../../entities/user';
import {getConnection,getRepository} from 'typeorm';
const userRepo = getRepository(User);

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
      const userRepo = getRepository(User);
      const user = userRepo.create(userData);
      await userRepo.save(user);
      return user;
  }

  static async getAll() {
      const userRepo = getRepository(User);
      const result = await userRepo.find();
      return result;
  }

  static async getOne(id: any) {
      const userRepo = getRepository(User);
      const user = await userRepo.findOne(id);
      return user;
  }

  static async update(id: any, userData: User) {
      const userRepo = getRepository(User);
      await userRepo.update(id, userData);
      const updatedUser = await userRepo.findOne(id);
      return updatedUser;
  }

  static async delete(id: any) {
    const userRepository = getRepository(User);
    const userToDelete = await userRepository.findOne({ where: { id } });

    if (!userToDelete) {
        return false;
    }

    await userRepository.remove(userToDelete);
    return true;
  }
}

export default UserService
