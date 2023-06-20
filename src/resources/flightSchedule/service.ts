import { getRepository } from 'typeorm';
import AirlineType from '../../entities/airlineType';
import Flight from '../../entities/flight';
import User from '../../entities/user';
import FlightSchedule from '../../entities/flightSchedule';
const flightScheduleRepo = getRepository(FlightSchedule);
const  service= {
  create:async(flightData:Flight) =>{
    console.log(flightData)
      const user = flightScheduleRepo.create(flightData);
      await flightScheduleRepo.save(user);
     return user;
  },
  getAll:async(query:any) =>{
 const result = await flightScheduleRepo.find({where:{deleted:false},relations:["createdBy","airLine"]});
      return result;
  },
 getOne:async(id: any)=> {
      const user = await flightScheduleRepo.findOne({where:{id:id},relations:["createdBy","airLine"]});
      return user;
  },
update:async(id:string,userData:Flight)=>{
const result=await flightScheduleRepo.update({id},userData);
  console.log("result is",result);
return result;
},
updateFlightStatus:async(id:string,userData:Flight)=>{
const result=await flightScheduleRepo.update({id},userData);
  console.log("result is",result);
return result;
},
delete:async(id:string)=>{
  const result=await flightScheduleRepo.update({id},{deleted:true});
  return result
}

}
export default service
