import { Length } from 'class-validator';
import  flightStatusService  from '../flightStatus/service';
import { Request,Response ,NextFunction} from "express";
import asyncHandler from "express-async-handler";
import service from "./service";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/appError";
import validator from "./validator";
import flightScheduleService from "../flightSchedule/service"
import deviceAPIService from "../deviceAPIs/service";
import saveLogService from "../../utils/saveLogsService"
import { QueryBuilder, createQueryBuilder, getRepository, getConnection } from 'typeorm';
import Crew from '../../entities/crew';
const crewRepo=getRepository(Crew)
import crewService from "../crew/service"
const {addNew,updateFlight,updateFlightStatus,addNewCrew}=validator
//* assign crew to schedule flight
const create = catchAsync(async (req:Request, res:Response, next:NextFunction):Promise<any> => {
  const { error } = addNew.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message,400));
  }
    // const scheduleExist=await service.getBySchedule(req.body.scheduledFlight);
    // if(scheduleExist.length!==0){
    // return res.status(400).send({msg:"already scheduled!"})
    // }
  const crewIds = req.body.crews.map(id => `'${id}'`).join(",");
  const onDuty=await crewRepo.query(`select * from crew
where  id IN (${crewIds}) AND "onDuty"=true`);
console.log(onDuty)
if(onDuty.length!==0){
  return res.status(400).send({msg:"Crew member already scheduled!"})
}
  const flight=await flightScheduleService.getOne(req.body.scheduledFlight);
  if(flight && flight.isLand!==false && flight.isSchedule!==true){
   return res.status(400).send({msg:"You can schedule flight crew after flight scheduling"})
  }
  if(flight && flight.isLand===false && flight.isSchedule===true){
    if(flight.flightStatus.status!=='On-Time'){
      return res.status(400).send({msg:"You can assign crew before flight departure"})
    }
  }
  const flightCrew = await service.create(req.body.flight,req.body.scheduledFlight,req.body.crews,req.body.airLine,req.body.createdBy);
  if(flightCrew.length!=0){
    await crewService.updateCrewDutyStatus(req.body.crews,true);
    return res.status(200).send({msg:"Crews Schedule successfully",data:flightCrew})
  }else{
    return res.status(400).send({msg:"Failed!"})
  }
});
//* getAll
const getAll = catchAsync(async (req: Request, res: Response):Promise<any> => {
  const list= await service.getAll(req.query);
  return res.status(200).send({msg:"List",data:list});
});
//* getAll
const getBySchedule = catchAsync(async (req: Request, res: Response):Promise<any> => {
  const crews= await service.getBySchedule(req.params.id);
  return res.status(200).send({msg:"Crews",data:crews});
});
  //* getOne
  const getOne =catchAsync(async (req: Request, res: Response):Promise<any> => {
    const booth = await service.getOne(req.params.id);
    if(booth){
        return res.status(200).send({msg:"Crew",data:booth});
    }else{
        return res.status(404).send({msg:"Not Found!"});
    }
  });


//* update
const addCrew = asyncHandler(async (req:Request, res:Response, next:Function):Promise<any> => {
  const { error } = addNewCrew.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message,400));
  }
  const onDuty=await crewRepo.query(`select * from crew
where  id IN ('${req.body.crew}') AND "onDuty"=true`);
if(onDuty.length!==0){
  return res.status(400).send({msg:"Crew member already scheduled!"})
}
  const flight=await flightScheduleService.getOne(req.body.scheduledFlight);
  if(flight && flight.isLand!==false && flight.isSchedule!==true){
   return res.status(400).send({msg:"You can schedule flight crew after flight scheduling"})
  }
  if(flight && flight.isLand===false && flight.isSchedule===true){
    if(flight.flightStatus.status!=='On-Time'){
      return res.status(400).send({msg:"You can assign crew before flight departure"})
    }
  }
  const flightCrew = await service.assignNewCrew(req.body);
  if(flightCrew){
    await crewService.updateNewCrewDutyStatus(req.body.crew,true);
    return res.status(200).send({msg:"Crew Schedule successfully",data:flightCrew})
  }else{
    return res.status(400).send({msg:"Failed!"})
  }
});
//* update remove Crew
const removeCrew = asyncHandler(async (req:Request, res:Response, next:Function):Promise<any> => {
  const onDuty=await crewRepo.query(`select * from crew
where  id IN ('${req.body.crew}') AND "onDuty"=false`);
if(onDuty.length!==0){
  return res.status(400).send({msg:"Crew member Not scheduled!"})
}
  const flight=await flightScheduleService.getOne(req.params.id);
  if(flight && flight.isLand!==false && flight.isSchedule!==true){
   return res.status(400).send({msg:"You can schedule flight crew after flight scheduling"})
  }
  if(flight && flight.isLand===false && flight.isSchedule===true){
    if(flight.flightStatus.status!=='On-Time'){
      return res.status(400).send({msg:"You can remove crew before flight departure"})
    }
  }
  const flightCrew = await service.removeCrew(req.params.id,req.body.crew);
  if(flightCrew){
    await crewService.updateNewCrewDutyStatus(req.body.crew,false);
    return res.status(200).send({msg:"Crew remove successfully"})
  }else{
    return res.status(400).send({msg:"Failed!"})
  }
});
//push date to device
const pushDateToDevice = catchAsync(async (req:Request, res:Response, next:NextFunction):Promise<any> => {
  const crews=await service.getAllVerifiedPushToDevice(req.params.id);
  if(crews.length!==0){
 const isSend=await deviceAPIService.pushDateToDevice(crews)
    if(isSend.Status===true){
    return res.status(200).send({msg:"Success",date:crews})
  }else{
    return res.status(400).send({msg:"Failed!"})
    }
 }
    else{
        return res.status(400).send({msg:"Failed!"})
  }
 
});
//push date to device
const getDeviceLogs = catchAsync(async (req:Request, res:Response, next:NextFunction):Promise<any> => {
 const isSend=await deviceAPIService.getLogs(req.body.startDate,req.body.endDate)
    if(isSend.Status===true){
      await saveLogService(isSend.Date)
    return res.status(200).send({msg:"Success",data:isSend})
  }else{
    return res.status(400).send({msg:"Failed!"})
    }
});
export default {create,getAll,getOne,addCrew,getBySchedule,removeCrew,pushDateToDevice,getDeviceLogs}
