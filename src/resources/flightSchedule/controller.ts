import  flightStatusService  from '../flightStatus/service';
import { Request,Response ,NextFunction} from "express";
import asyncHandler from "express-async-handler";
import service from "./service";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/appError";
import validator from "./validator";
const {addNew,updateFlight,updateFlightStatus}=validator
//* createUser
const create = catchAsync(async (req:Request, res:Response, next:NextFunction):Promise<any> => {
  const { error } = addNew.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message,400));
  }
  const flight=await service.getScheduleFlight(req.body.flight);
  console.log("flight",flight);
  if(flight && flight.isLand===false){
    const flightStatus=await flightStatusService.getOne(flight.flightStatus);
    if((flight.scheduleType==="arrival" && flightStatus.status!=="Arrived")||(flight.scheduleType==="departure" && flightStatus.status!=="departed")){
   return res.status(400).send({msg:"You can schedule flight after landing"})
    }
  }
  if(flight && flight.isLand===true){
    if (
  (flight.scheduleType === "arrival" && req.body.scheduleType !== "departure") ||
  (flight.scheduleType === "departure" && req.body.scheduleType !== "arrival")
) {
  return res.status(400).send({
    msg: "You can only schedule a flight for the opposite type of the previous schedule. For example, if the previous schedule was an arrival, you can schedule a departure. If the previous schedule was a departure, you can schedule an arrival."
  });
}
  }
  const booth = await service.create(req.body);
  if(booth){
    return res.status(200).send({msg:"Flight Schedule successfully",data:booth})
  }else{
    return res.status(400).send({msg:"Failed!"})
  }
});
//* getAll
const getAll = catchAsync(async (req: Request, res: Response):Promise<any> => {
  const booths= await service.getAll(req.query);
  return res.status(200).send({msg:"Flights",data:booths});
});
//*recent schedule flights getAll
const recentScheduled = catchAsync(async (req: Request, res: Response):Promise<any> => {
  const booths= await service.recentScheduled();
  return res.status(200).send({msg:"Flights",data:booths});
});

  //* getOne
  const getOne =catchAsync(async (req: Request, res: Response):Promise<any> => {
    const booth = await service.getOne(req.params.id);
    if(booth){
        return res.status(200).send({msg:"Flight",data:booth});
    }else{
        return res.status(404).send({msg:"Not Found!"});
    }
  });


//* update
const update = asyncHandler(async (req:Request, res:Response, next:Function):Promise<any> => {
  const { error } = updateFlight.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message,400));
  }
    const result = await service.update(String(req.params.id),req.body);
    if (result.affected) {
       return  res.status(200).send({ msg: "Flight Updated" })
    } else {
      return  res.status(400).send({ msg: "Failed!" })
    }
});
const updateStatus = asyncHandler(async (req:Request, res:Response, next:Function):Promise<any> => {
  const { error } = updateFlightStatus.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message,400));
  }
  //const flightStatus=await flightStatusService.getOne(req.body.flightStatus);
    const result = await service.updateFlightStatus(String(req.params.id),req.body);
    if (result.affected) {
       return  res.status(200).send({ msg: "Flight Status Updated" })
    } else {
      return  res.status(400).send({ msg: "Failed!" })
    }
});
const deleteFlight=asyncHandler(async(req:Request,res:Response,next:Function):Promise<any>=>{
//const isAssigned=await 
  const result =await service.delete(String(req.params.id));
  // if(result.affected===0){
  //  return res.status(404).send({msg:"Not Found!"})
  // }
  if(result.affected){
   return res.status(200).send({
      msg:"deleted"
    })
  }else{
 return res.status(400).send({msg:"failed"})
  }
});
export default {create,getAll,getOne,update,deleteFlight,updateStatus,recentScheduled}