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
      const status = await statusRepo.findOneBy({id});
      return status;
  },
  getByStatus:async()=> {
      const status = await statusRepo.findOne({where:{status:"On-Time"}});
      console.log( status)
      return status;
  },
update:async(id:string,statusDate:Statuses)=>{
const result=await statusRepo.update({id},statusDate);
return result;
},
delete:async(id:string)=>{
  const result=await statusRepo.update({id},{deleted:true});
  return result
},
}
export default service
