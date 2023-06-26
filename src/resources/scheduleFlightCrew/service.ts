import scheduleFlightCrew from '../../entities/scheduleFlightCrew';
import { QueryBuilder, createQueryBuilder, getRepository, getConnection } from 'typeorm';
import Statuses from '../../entities/flightStatus';
import Crew from '../../entities/crew';
const crewRepo=getRepository(Crew);
const scheduleFlightCrewRepo=getRepository(scheduleFlightCrew)
const  service= {
  create:async(scheduleFlightData:scheduleFlightCrew) =>{
    const crewIds = scheduleFlightData.crews || [];
    const crews = await Promise.all(crewIds.map((id) => crewRepo.findOneBy({id:id.toString()})));
    const newCrew = scheduleFlightCrewRepo.create({...scheduleFlightData,crews:crews||[]});
    console.log(newCrew);
  //    newCrew.crews.forEach((crew, index) => {
  //   newCrew.crews[index] = crew;
  // });
    await scheduleFlightCrewRepo.save(newCrew);
    return newCrew;
  },
  getAll:async(query:any) =>{
 const result = await scheduleFlightCrewRepo.find({where:{deleted:false},relations:["airLine","flightStatus"]});
      return result;
  },
 getOne:async(id: any)=> {
      const flight = await scheduleFlightCrewRepo.findOne({where:{id:id},relations:["flightStatus","airLine"]});
      return flight;
  },
recentScheduled:async()=>{
const currentDate=new Date().toLocaleDateString();
const flights=await scheduleFlightCrewRepo.query(`SELECT fs.id, fs."scheduleDate" ,fs."departureDate",fs."arrivalDate",
at.name as airLine,
f."flightNo",f."origin",f."destination",s."status"
FROM flight_schedule AS fs
LEFT JOIN airline_type AS at ON "airLineId" = at.id
LEFT JOIN flight AS f ON "flightId" = f.id
LEFT JOIN statuses AS s ON "flightStatusId" = s.id where Date("scheduleDate")='${currentDate}'::date`);
return flights;
},
getScheduleFlight:async(flightId: any)=> {
const flight =await scheduleFlightCrewRepo.query(`SELECT *
FROM flight_schedule
WHERE "flightId" ='${flightId}'
ORDER BY "createdDate" DESC
LIMIT 1;
`);

return flight[0]
  },
update:async(id:string,scheduleFlightData:scheduleFlightCrew)=>{
const result=await scheduleFlightCrewRepo.update({id},scheduleFlightData);
return result;
},
updateFlightStatus:async(id:string,scheduleFlightData:scheduleFlightCrew)=>{
const result=await  scheduleFlightCrewRepo.createQueryBuilder().update(scheduleFlightData).where("id=:id",{id}).returning("*").execute();
// if(result.affected){
//   const status=await flightStatusService.getOne(result.raw[0].flightStatusId);
//   if(status.status==="Arrived"||status.status==="Departed"){
//    await scheduleFlightCrewRepo.update({id},{isLand:true,isSchedule:false})
//   }
// }
return result;
},
delete:async(id:string)=>{
  const result=await scheduleFlightCrewRepo.update({id},{deleted:true});
  return result
}

}
export default service
