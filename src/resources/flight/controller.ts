import { Request,Response ,NextFunction} from "express";
import asyncHandler from "express-async-handler"
import service from "./service"
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
  const flight = await service.create(req.body);
  if(flight){
    return res.status(200).send({msg:"Flight Added",data:flight})
  }else{
    return res.status(400).send({msg:"Failed!"})
  }
});
//* getAll
const getAll = catchAsync(async (req: Request, res: Response):Promise<any> => {
  const flights= await service.getAll();
  return res.status(200).send({msg:"Flights",data:flights});
});
const getAllByAirLine = catchAsync(async (req: Request, res: Response):Promise<any> => {
  const flights= await service.getFlightByAirLine(req.params.airLine);
  return res.status(200).send({msg:"Flights",data:flights});
});
  //* getOne
  const getOne =catchAsync(async (req: Request, res: Response):Promise<any> => {
    const flight = await service.getOne(req.params.id);
    if(flight){
        return res.status(200).send({msg:"Flight",data:flight});
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
    const result = await service.updateFlightStatus(String(req.params.id),req.body);
    if (result.affected) {
       return  res.status(200).send({ msg: "Flight Updated" })
    } else {
      return  res.status(400).send({ msg: "Failed!" })
    }
});
const deleteFlight=asyncHandler(async(req:Request,res:Response,next:Function):Promise<any>=>{
//const isAssigned=await 
  const result =await service.delete(String(req.params.id));
  if(result.affected===0){
   return res.status(404).send({msg:"Not Found!"})
  }
  if(result){
   return res.status(200).send({
      msg:"deleted"
    })
  }else{
 return res.status(400).send({msg:"failed"})
  }
});
export default {create,getAll,getOne,update,deleteFlight,updateStatus,getAllByAirLine}