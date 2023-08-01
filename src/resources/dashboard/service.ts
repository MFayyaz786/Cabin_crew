import { getRepository,FindManyOptions } from 'typeorm';
import Flight from '../../entities/flight';
import Crew from '../../entities/crew';
const flightRepo = getRepository(Flight);
const crewRepo = getRepository(Crew);
const  service= {
  getAll:async() =>{
  const result = await flightRepo.query(`select count(id) as totalFlights from flight`);
  const crewState=await crewRepo.query(`SELECT 
  COUNT(CASE WHEN "isVerified" = true THEN 1 ELSE 0 END) AS totalAuthorized,
  ROUND(AVG(CASE WHEN "isVerified" = true THEN 1 ELSE 0 END) * 100,0)AS cleared,
  ROUND(AVG(CASE WHEN "isVerified" = false THEN 1 ELSE 0 END) * 100,0) AS uncleared
  FROM crew`)
const combinedResult = {
  totalFlights: result[0].totalflights,
  totalAuthorizedStaff: crewState[0].totalauthorized,
  cleared: crewState[0].cleared,
  uncleared: crewState[0].uncleared
};

console.log(combinedResult); 
   return combinedResult;
  },
 getStaffStates:async() =>{
  const result = await flightRepo.query(`select count(id) as totalFlights from flight`);
  const crewState=await crewRepo.query(`SELECT 
  COUNT(id) AS totalCrews,
  ROUND(AVG(CASE WHEN "onDuty" = true THEN 1 ELSE 0 END) * 100,0)AS OnDuty,
  ROUND(AVG(CASE WHEN "onDuty" = false THEN 1 ELSE 0 END) * 100,0) AS OffDuty
  FROM crew`)
  const combinedResult={
    totalFlights:result[0].totalflights,
    totalCrewMember:crewState[0].totalcrews,
    OnDuty:crewState[0].onduty,
    OffDuty:crewState[0].offduty
  }
  return combinedResult;
  },
  getAirLineStates:async(id:any)=> {
  const result = await flightRepo.query(`select count(id) as totalFlights from flight where "airLineId" = '${id}'`);
  const crewState = await crewRepo.query(`SELECT 
  COUNT(CASE WHEN "isVerified" = true THEN 1 ELSE NULL END) AS totalAuthorized,
  COUNT(CASE WHEN "isVerified" = false THEN 1 ELSE NULL END) AS unAuthorized,
  COUNT(CASE WHEN "onDuty" = true THEN 1 ELSE NULL END) AS OnDuty,
  COUNT(CASE WHEN "isDeliveredToDevice" = true THEN 1 ELSE NULL END) AS uploaded,
  COUNT(CASE WHEN "isDeliveredToDevice" = false THEN 1 ELSE NULL END) AS pending
  FROM crew where "airLineId" = '${id}'`);

console.log(crewState)
  const combinedResult={
    totalFlights:result[0].totalflights,
    totalAuthorizedStaff:crewState[0].totalauthorized,
    totalUnAuthorizedStaff:crewState[0].unauthorized,
    OnDuty:crewState[0].onduty,
    UploadedData:crewState[0].uploaded,
    PendingData:crewState[0].pending
  }
  return combinedResult;
  },


}
export default service
