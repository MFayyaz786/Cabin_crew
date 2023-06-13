import {getConnection,getRepository} from 'typeorm';
import Device from '../../entities/device';
import bcrypt from "bcrypt";
const deviceRepo = getRepository(Device);
const  service= {
  create:async(deviceData: Device) =>{
      const salt = await bcrypt.genSalt(10);
      deviceData.password = await bcrypt.hash(deviceData.password, salt);
      const user = deviceRepo.create(deviceData);
      await deviceRepo.save(user);
      return user;
  },
  getAll:async(query:any) =>{
      const result = await deviceRepo.find({where:query});
      return result;
  },
 getOne:async(id: any)=> {
      const user = await deviceRepo.findOneBy({id});
      return user;
  },
update:async(id:string,deviceData:Device)=>{
const result=await deviceRepo.update({id},deviceData);
  console.log("result is",result);
return result;
},
delete:async(id:string)=>{
  const result=await deviceRepo.delete({id});
  return result
}

}
export default service
