import scheduleFlightCrew from '../../entities/scheduleFlightCrew';
import scheduleCrews from '../../entities/scheduleCrews';
import { QueryBuilder, createQueryBuilder, getRepository, getConnection } from 'typeorm';
import Statuses from '../../entities/flightStatus';
import Crew from '../../entities/crew';
const crewRepo=getRepository(Crew);
import FlightSchedule from '../../entities/flightSchedule';
const flightScheduleRepo=getRepository(FlightSchedule)
const scheduleFlightCrewRepo=getRepository(scheduleFlightCrew)
const scheduleCrewsRepo=getRepository(scheduleCrews)
const  service= {
  create:async(flight:any,scheduledFlight:any,crews:any,airLine:any,createdBy:any) =>{
    let crewsList=[];
      for(let i=0;i<crews.length; i++){
        const newCrew = scheduleFlightCrewRepo.create({flight,scheduledFlight,crew:crews[i],airLine,createdBy});
        await scheduleFlightCrewRepo.save(newCrew);
        crewsList.push(newCrew)
      }
    return crewsList;
  },
  getAll:async(query:any) =>{
 const result = await scheduleFlightCrewRepo.find({where:{deleted:false},relations:["crew","airLine","scheduledFlight"]})
 //.query(`SELECT * FROM schedule_flight_crew where "deleted" = false `);
 console.log(result);
 
      return result;
  },
getBySchedule:async(scheduleFlightId:any) =>{
 const result = await scheduleFlightCrewRepo.query(
  `SELECT sfc.id, sfc."crewId",c."name",c."gender",c."designation",c."cardNo" ,sfc."scheduledFlightId"
  FROM schedule_flight_crew sfc JOIN crew c ON sfc."crewId"= c.id WHERE sfc."scheduledFlightId"='${scheduleFlightId}' AND sfc."deleted"=false`)
  // JOIN schedule_flight_crew_crews_crew sfccc 
  // ON sfccc."scheduleFlightCrewId" = sfc.id JOIN crew c ON sfccc."crewId"= c.id WHERE sfc."scheduledFlightId"='${scheduleFlightId}'`);
 //find({where:{deleted:false},relations:["crews","airLine","scheduledFlight"]})
 //.query(`SELECT * FROM schedule_flight_crew where "deleted" = false `);
 console.log(result);
      return result;
  },
 getOne:async(id: any)=> {
      const flight = await scheduleFlightCrewRepo.findOne({where:{id:id,deleted:false},relations:["crew","airLine","scheduledFlight"]});
      return flight;
  },
getFlightScheduleCrews:async(id: any)=> {
  console.log("hello",id)
      const flight = await scheduleFlightCrewRepo.query(`SELECT sfc.id, sfc."crewId" FROM schedule_flight_crew sfc WHERE sfc."scheduledFlightId" = '${id} AND sfc."deleted"=false';
`)
//JOIN schedule_flight_crew_crews_crew sfccc ON sfccc."scheduleFlightCrewId" = sfc.id
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
assignNewCrew:async(scheduleFlightData:scheduleFlightCrew)=>{
   const newCrew = scheduleFlightCrewRepo.create(scheduleFlightData);
   await scheduleFlightCrewRepo.save(newCrew);
   return newCrew;
},
removeCrew:async(scheduledFlight:any,crew:any)=>{
   console.log(scheduledFlight,crew)
   const result =await scheduleFlightCrewRepo.
   query(`UPDATE schedule_flight_crew SET "deleted" = true where "scheduledFlightId" = '${scheduledFlight}' AND "crewId" = '${crew}'`);
   return result[1];
},
getAllVerifiedPushToDevice:async(flightScheduledId:any) =>{
//     const crews=await crewRepo.query(`select name as "Name","employId" as "EmpNo","cardNo" as "CardNo","image" as "ImageDate","thumbImpression" as "FPData" from crew 
// where deleted=false AND "isVerified"=true
// AND
// "airLineId"='${airLine}'`)
const crews=await scheduleFlightCrewRepo.query(` SELECT c."name" as "Name",c."employId" as "EmpNo",c."cardNo" as "CardNo",c."image" as "ImageDate",c."thumbImpression" as "FPData"
 FROM schedule_flight_crew
 AS sfc 
 JOIN crew AS c ON sfc."crewId" = c.id 
 WHERE c."isVerified" =true AND sfc."scheduledFlightId" = '${flightScheduledId}'`)
      return crews;
  },
}
export default service
