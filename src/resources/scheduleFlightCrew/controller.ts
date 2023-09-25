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
    if(isSend.Status===true && isSend.Data.length!==0){
  //     const isSend=[
  //   {
  //     LogNo: 1,
  //     LogTime: '2023:6:21:12:11:5',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2',
  //     EmployeeNo: '8'
  //   },
  //   {
  //     LogNo: 2,
  //     LogTime: '2023:6:21:12:14:21',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2',
  //     EmployeeNo: '8'
  //   },
  //   {
  //     LogNo: 3,
  //     LogTime: '2023:6:21:14:17:5',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2',
  //     EmployeeNo: '8'
  //   },
  //   {
  //     LogNo: 4,
  //     LogTime: '2023:6:21:14:17:10',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '2',
  //     EmployeeNo: '8'
  //   },
  //   {
  //     LogNo: 5,
  //     LogTime: '2023:6:22:10:37:1',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '2',
  //     EmployeeNo: '8'
  //   },
  //   {
  //     LogNo: 6,
  //     LogTime: '2023:6:22:10:37:19',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2',
  //     EmployeeNo: '8'
  //   },
  //   {
  //     LogNo: 7,
  //     LogTime: '2023:6:22:10:41:11',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2',
  //     EmployeeNo: '8'
  //   },
  //   {
  //     LogNo: 8,
  //     LogTime: '2023:6:22:10:41:41',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2',
  //     EmployeeNo: '8'
  //   },
  //   {
  //     LogNo: 9,
  //     LogTime: '2023:6:22:11:27:12',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '2',
  //     EmployeeNo: '8'
  //   },
  //   {
  //     LogNo: 10,
  //     LogTime: '2023:6:22:12:7:6',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '2',
  //     EmployeeNo: '8'
  //   },
  //   {
  //     LogNo: 11,
  //     LogTime: '2023:6:23:20:5:48',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2',
  //     EmployeeNo: '8'
  //   },
  //   {
  //     LogNo: 12,
  //     LogTime: '2023:7:4:16:9:35',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '2',
  //     EmployeeNo: '8'
  //   },
  //   {
  //     LogNo: 13,
  //     LogTime: '2023:7:5:12:29:30',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '2',
  //     EmployeeNo: '8'
  //   },
  //   {
  //     LogNo: 14,
  //     LogTime: '2023:7:5:15:53:22',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '2',
  //     EmployeeNo: '8'
  //   },
  //   {
  //     LogNo: 15,
  //     LogTime: '2023:7:5:15:56:22',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '2',
  //     EmployeeNo: '8'
  //   },
  //   {
  //     LogNo: 16,
  //     LogTime: '2023:7:5:17:17:27',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '9',
  //     EmployeeNo: '9'
  //   },
  //   {
  //     LogNo: 17,
  //     LogTime: '2023:7:5:17:24:12',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '9',
  //     EmployeeNo: '9'
  //   },
  //   {
  //     LogNo: 18,
  //     LogTime: '2023:7:5:17:24:35',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '9',
  //     EmployeeNo: '9'
  //   },
  //   {
  //     LogNo: 19,
  //     LogTime: '2023:7:6:10:54:19',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 20,
  //     LogTime: '2023:7:6:10:54:23',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '9',
  //     EmployeeNo: '9'
  //   },
  //   {
  //     LogNo: 21,
  //     LogTime: '2023:7:6:10:54:31',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '6',
  //     EmployeeNo: '6'
  //   },
  //   {
  //     LogNo: 22,
  //     LogTime: '2023:7:6:10:54:50',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 23,
  //     LogTime: '2023:7:6:10:54:53',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '7890024',
  //     EmployeeNo: '2013'
  //   },
  //   {
  //     LogNo: 24,
  //     LogTime: '2023:7:6:10:55:46',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 25,
  //     LogTime: '2023:7:6:10:55:50',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '7890024',
  //     EmployeeNo: '2013'
  //   },
  //   {
  //     LogNo: 26,
  //     LogTime: '2023:7:6:10:56:12',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 27,
  //     LogTime: '2023:7:6:10:56:20',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '6',
  //     EmployeeNo: '6'
  //   },
  //   {
  //     LogNo: 28,
  //     LogTime: '2023:7:6:10:56:43',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '9',
  //     EmployeeNo: '9'
  //   },
  //   {
  //     LogNo: 29,
  //     LogTime: '2023:7:6:11:57:27',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 30,
  //     LogTime: '2023:7:6:11:58:3',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 31,
  //     LogTime: '2023:7:6:12:1:3',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '22222',
  //     EmployeeNo: '88888'
  //   },
  //   {
  //     LogNo: 32,
  //     LogTime: '2023:7:6:12:2:8',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '9',
  //     EmployeeNo: '9'
  //   },
  //   {
  //     LogNo: 33,
  //     LogTime: '2023:7:6:12:4:29',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '22222',
  //     EmployeeNo: '88888'
  //   },
  //   {
  //     LogNo: 34,
  //     LogTime: '2023:7:6:12:5:38',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '22222',
  //     EmployeeNo: '88888'
  //   },
  //   {
  //     LogNo: 35,
  //     LogTime: '2023:7:6:12:8:16',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '9',
  //     EmployeeNo: '9'
  //   },
  //   {
  //     LogNo: 36,
  //     LogTime: '2023:7:6:12:9:58',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '9',
  //     EmployeeNo: '9'
  //   },
  //   {
  //     LogNo: 37,
  //     LogTime: '2023:7:6:12:11:2',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 38,
  //     LogTime: '2023:7:6:12:11:7',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '22222',
  //     EmployeeNo: '88888'
  //   },
  //   {
  //     LogNo: 39,
  //     LogTime: '2023:7:6:12:18:55',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 40,
  //     LogTime: '2023:7:6:12:19:21',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '9',
  //     EmployeeNo: '9'
  //   },
  //   {
  //     LogNo: 41,
  //     LogTime: '2023:7:6:12:19:38',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '22222',
  //     EmployeeNo: '88888'
  //   },
  //   {
  //     LogNo: 42,
  //     LogTime: '2023:7:6:13:32:42',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '22222',
  //     EmployeeNo: '88888'
  //   },
  //   {
  //     LogNo: 43,
  //     LogTime: '2023:7:6:14:42:41',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 44,
  //     LogTime: '2023:7:7:13:0:2',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 45,
  //     LogTime: '2023:7:10:12:5:16',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 46,
  //     LogTime: '2023:7:10:12:5:25',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 47,
  //     LogTime: '2023:7:10:12:5:34',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 48,
  //     LogTime: '2023:7:10:12:5:44',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 49,
  //     LogTime: '2023:7:10:12:5:48',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 50,
  //     LogTime: '2023:7:10:12:5:51',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 51,
  //     LogTime: '2023:7:10:12:5:55',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 52,
  //     LogTime: '2023:7:10:14:16:16',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 53,
  //     LogTime: '2023:7:10:14:16:17',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 54,
  //     LogTime: '2023:7:10:14:16:21',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 55,
  //     LogTime: '2023:7:10:14:16:24',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 56,
  //     LogTime: '2023:7:10:14:16:27',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 57,
  //     LogTime: '2023:7:10:14:19:14',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 58,
  //     LogTime: '2023:7:10:14:22:24',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 59,
  //     LogTime: '2023:7:10:14:38:48',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 60,
  //     LogTime: '2023:7:10:15:17:32',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 61,
  //     LogTime: '2023:7:10:18:6:7',
  //     MajorType: 'Event',
  //     MinorType: 'FACE_RECOG_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 62,
  //     LogTime: '2023:7:11:15:38:5',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '2222',
  //     EmployeeNo: '888'
  //   },
  //   {
  //     LogNo: 63,
  //     LogTime: '2023:7:11:15:38:20',
  //     MajorType: 'Event',
  //     MinorType: 'FINGERPRINT_COMPARE_PASS',
  //     CardNo: '22222',
  //     EmployeeNo: '88888'
  //   }
  // ]
     const isSaved= await saveLogService(isSend.Data)
     if(isSaved){
    return res.status(200).send({msg:"Success"})
  }else{
    return res.status(400).send({msg:"Failed!"})
  }
}else if(isSend.Status===true && isSend.Data.length===0){
  return res.status(404).send({msg:"Logs Not Found"})
}
else{
    return res.status(400).send({msg:"Failed!"})
    }
});

export default {create,getAll,getOne,addCrew,getBySchedule,removeCrew,pushDateToDevice,getDeviceLogs}
