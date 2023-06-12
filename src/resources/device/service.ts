import {getConnection,getRepository} from 'typeorm';
import Device from '../../entities/device';
import bcrypt from "bcrypt";
const userRepo = getRepository(Device);
const  service= {
  create:async(userData: Device) =>{
      const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
      const user = userRepo.create(userData);
      await userRepo.save(user);
      return user;
  },
  getAll:async(query:any) =>{
      const result = await userRepo.find({where:query});
      return result;
  },
 getOne:async(id: any)=> {
      const user = await userRepo.findOneBy({id});
      return user;
  },
update:async(id:string,userData:Device)=>{
const result=await userRepo.update({id},userData);
  console.log("result is",result);
return result;
},
delete:async(id:string)=>{
  const result=await userRepo.delete({id});
  return result
}

}
export default service
