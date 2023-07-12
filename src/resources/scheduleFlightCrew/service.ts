import scheduleFlightCrew from '../../entities/scheduleFlightCrew';
import { QueryBuilder, createQueryBuilder, getRepository, getConnection } from 'typeorm';
import Statuses from '../../entities/flightStatus';
import Crew from '../../entities/crew';
const crewRepo=getRepository(Crew);
import FlightSchedule from '../../entities/flightSchedule';
const flightScheduleRepo=getRepository(FlightSchedule)
const scheduleFlightCrewRepo=getRepository(scheduleFlightCrew)
const  service= {
  create:async(scheduleFlightData:scheduleFlightCrew) =>{
    const crewIds = scheduleFlightData.crews || [];
    const crews = await Promise.all(crewIds.map((id) => crewRepo.findOneBy({id:id.toString()})));
    const newCrew = scheduleFlightCrewRepo.create({...scheduleFlightData,crews:crews||[]});
    await scheduleFlightCrewRepo.save(newCrew);
    return newCrew;
  },
  getAll:async(query:any) =>{
 const result = await scheduleFlightCrewRepo.find({where:{deleted:false},relations:["crews","airLine","scheduledFlight"]})
 //.query(`SELECT * FROM schedule_flight_crew where "deleted" = false `);
 console.log(result);
 
      return result;
  },
  getBySchedule:async(scheduleFlightId:any) =>{
 const result = await scheduleFlightCrewRepo.query(
  `SELECT sfc.id, sfccc."crewId",c."name",c."gender",c."designation",c."cardNo" ,sfc."scheduledFlightId"
  FROM schedule_flight_crew sfc JOIN schedule_flight_crew_crews_crew sfccc 
  ON sfccc."scheduleFlightCrewId" = sfc.id JOIN crew c ON sfccc."crewId"= c.id WHERE sfc."scheduledFlightId"='${scheduleFlightId}'`);
 //find({where:{deleted:false},relations:["crews","airLine","scheduledFlight"]})
 //.query(`SELECT * FROM schedule_flight_crew where "deleted" = false `);
 console.log(result);
 
      return result;
  },
 getOne:async(id: any)=> {
      const flight = await scheduleFlightCrewRepo.findOne({where:{id:id},relations:["crews","airLine","scheduledFlight"]});
      return flight;
  },
getFlightScheduleCrews:async(id: any)=> {
      const flight = await scheduleFlightCrewRepo.query(`SELECT sfc.id, sfccc."crewId"
FROM schedule_flight_crew sfc
JOIN schedule_flight_crew_crews_crew sfccc ON sfccc."scheduleFlightCrewId" = sfc.id
WHERE sfc."scheduledFlightId" = '${id}';
`)
      //findOneBy({  scheduledFlightId:id ,
  // relations: ["crews", "airLine", "scheduleFlight"], // Updated relation name
//});
      return flight;
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
assignNewCrew:async(body:any)=>{
const result=await scheduleFlightCrewRepo.query(`UPDATE schedule_flight_crew
SET "crews" = array_append(crews, '${body.crew}'), "updatedBy"='${body.updatedBy}'
WHERE "scheduledFlightId" = '${body.scheduledFlight}'
`);
return result;
},

}
export default service
