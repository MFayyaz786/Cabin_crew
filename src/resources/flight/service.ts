import { getRepository } from 'typeorm';
import AirlineType from '../../entities/airlineType';
import Flight from '../../entities/flight';
import User from '../../entities/user';
const flightRepo = getRepository(Flight);
const airlineRepo=getRepository(AirlineType);
const userRepo=getRepository(User)
 
const  service= {
  create:async(userDate:Flight) =>{
      const user = flightRepo.create(userDate);
      await flightRepo.save(user);
     return user;
  },
  getAll:async(query:any) =>{
 const result = await flightRepo.find({where:query,relations:["createdBy","airLine"]});
      return result;
  },
 getOne:async(id: any)=> {
      const user = await flightRepo.findOne({where:{id:id},relations:["createdBy","airLine"]});
      return user;
  },
update:async(id:string,userData:Flight)=>{
const result=await flightRepo.update({id},userData);
  console.log("result is",result);
return result;
},
delete:async(id:string)=>{
  const result=await flightRepo.delete({id});
  return result
}

}
export default service
