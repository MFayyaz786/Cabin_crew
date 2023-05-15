import User from '../../entities/user';
import {getConnection,getRepository} from 'typeorm';
const userRepo = getRepository(User);

export  const service=  {
  create:async(userData: User) => {
    const users =  userRepo.create(userData);
    await userRepo.save(users);
    return  users;
  },
  getAll:async ()=>{
    const result=await userRepo.find();
    return result
  },
  getOne: async (id: any) => {
  const user = await userRepo.findOne({where:{id:id}});
  return user;
  },
  update:async(id:any,userData:User)=>{
  const result=await userRepo.update({id},userData);
  return result;
  },
  delete:async(id:any)=>{
    const result=await userRepo.delete({id});
    console.log("result is",result);
    
    return result
  }

};
export default service
