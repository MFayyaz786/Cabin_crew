import { FlightStatus } from './../../entities/flight';
import { QueryBuilder, createQueryBuilder, getRepository, getConnection } from 'typeorm';
import FlightSchedule from '../../entities/flightSchedule';
const flightScheduleRepo = getRepository(FlightSchedule);
import Statuses from '../../entities/flightStatus';
import flightStatusService from "../flightStatus/service"
const flightStatusRepo=getRepository(Statuses)
const  service= {
  create:async(flightScheduleData:FlightSchedule) =>{
    const status = await flightStatusRepo.findOne({where:{status:"On-Time"}});
    flightScheduleData.flightStatus=status;
    const user = flightScheduleRepo.create(flightScheduleData);
    await flightScheduleRepo.save(user);
    return user;
  },
  getAll:async(query:any) =>{
 const result = await flightScheduleRepo.find({where:{deleted:false},relations:["airLine","flightStatus"]});
      return result;
  },
 getOne:async(id: any)=> {
      const flight = await flightScheduleRepo.findOne({where:{id:id},relations:["flightStatus","airLine"]});
      return flight;
  },
recentScheduled:async()=>{
const currentDate=new Date().toLocaleDateString();
const flights=await flightScheduleRepo.query(`SELECT fs.id, fs."scheduleDate" ,fs."departureDate",fs."arrivalDate",
at.name as airLine,
f."flightNo",f."origin",f."destination",s."status"
FROM flight_schedule AS fs
LEFT JOIN airline_type AS at ON "airLineId" = at.id
LEFT JOIN flight AS f ON "flightId" = f.id
LEFT JOIN statuses AS s ON "flightStatusId" = s.id where Date("scheduleDate")='${currentDate}'::date`);
return flights;
},
getScheduleFlight:async(flightId: any)=> {
const flight =await flightScheduleRepo.query(`SELECT *
FROM flight_schedule
WHERE "flightId" ='${flightId}'
ORDER BY "createdDate" DESC
LIMIT 1;
`);
return flight[0]
  },
update:async(id:string,flightScheduleData:FlightSchedule)=>{
const result=await flightScheduleRepo.update({id},flightScheduleData);
return result;
},
updateFlightStatus:async(id:string,flightScheduleData:FlightSchedule)=>{
const result=await  flightScheduleRepo.createQueryBuilder().update(flightScheduleData).where("id=:id",{id}).returning("*").execute();
if(result.affected){
  const status=await flightStatusService.getOne(result.raw[0].flightStatusId);
  if(status.status==="Arrived"||status.status==="Departed"){
   await flightScheduleRepo.update({id},{isLand:true,isSchedule:false})
  }
}
return result;
},
delete:async(id:string)=>{
  const result=await flightScheduleRepo.update({id},{deleted:true});
  return result
}

}
export default service
