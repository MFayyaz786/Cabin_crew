import { getRepository,FindManyOptions } from 'typeorm';
import AirlineType from '../../entities/airlineType';
import Flight from '../../entities/flight';
import User from '../../entities/user';
const flightRepo = getRepository(Flight);
const  service= {
  create:async(userDate:Flight) =>{
      const user = flightRepo.create(userDate);
      await flightRepo.save(user);      
     return user;
  },
  getAll:async() =>{
 const result = await flightRepo.find({where:{deleted:false},relations:["createdBy","airLine"]});
      return result;
  },
 getFlightByAirLine:async(airLine:any) =>{
  console.log(airLine)
  const options: FindManyOptions<Flight> = {
    where: { airLine: { id: airLine },deleted:false },
    relations: ["createdBy", "airLine", "updatedBy"]
  };
  const result = await flightRepo.find(options);
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
updateFlightStatus:async(id:string,userData:Flight)=>{
const result=await flightRepo.update({id},userData);
  console.log("result is",result);
return result;
},
delete:async(id:string)=>{
  const result=await flightRepo.update({id},{deleted:true});
  return result
}
}
export default service
