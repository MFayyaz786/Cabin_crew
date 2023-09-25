import { getRepository } from "typeorm";
import AirlineType from "../../entities/airlineType";
import Statuses from "../../entities/flightStatus";
const statusRepo=getRepository(Statuses)
const AirlineTypeRepo=getRepository(AirlineType)
export const  service={
 getAll:async ()=>{
    const result=await AirlineTypeRepo.find({where:{deleted:false,isActive:true}});
    return result
  },
getOne: async (id: string) => {
  const user = await AirlineTypeRepo.findOne({where:{id:id}});
  return user;
},
add:async(data:AirlineType)=>{
  console.log(data)
const result= AirlineTypeRepo.create(data);
await AirlineTypeRepo.save(result);
return result;
},
update:async(id:string,body:AirlineType)=>{
    const result=await AirlineTypeRepo.update({id},body);
    return result
},
delete:async(id:string)=>{
  const result=await AirlineTypeRepo.update({id},{deleted:true});
  return result
}
}
export default service