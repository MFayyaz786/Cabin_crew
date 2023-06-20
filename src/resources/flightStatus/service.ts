import Statuses from '../../entities/flightStatus';
import {getConnection,getRepository,} from 'typeorm';
const statusRepo = getRepository(Statuses);
const  service= {
  create:async(statusDate: Statuses) =>{
      const user = statusRepo.create(statusDate);
      await statusRepo.save(user);
      return user;
  },
  getAll:async() =>{
      const result = await statusRepo.find({where:{deleted:false}});
      return result;
  },
 getOne:async(id: any)=> {
      const user = await statusRepo.findOneBy({id});
      return user;
  },
update:async(id:string,statusDate:Statuses)=>{
const result=await statusRepo.update({id},statusDate);
  console.log("result is",result);
return result;
},
delete:async(id:string)=>{
  const result=await statusRepo.update({id},{deleted:true});
  return result
},
}
export default service
