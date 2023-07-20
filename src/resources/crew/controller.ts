import { Request,Response ,NextFunction} from "express";
import asyncHandler from "express-async-handler"
import service from "./service"
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/appError";
import validator from "./validator";
import { isBase64, Length } from 'class-validator';
import deviceAPIService from "../deviceAPIs/service"
const {addNew,updateCrew,registerThumb,verifyThumb,pushCrewDetails}=validator
//* createUser
const create = catchAsync(async (req:Request, res:Response, next:NextFunction):Promise<any> => {
  const { error } = addNew.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message,400));
  }
  const crew = await service.create(req.body);
 if(crew){
    const isSend=await deviceAPIService.pushRegisterCrew(crew.cardNo,crew.employId,crew.name,crew.image)
    if(isSend.Status===true){
    await service.updateDeliveredStatus(String(crew.id))
    return res.status(200).send({msg:"Crew Added"})
  }else{
    return res.status(200).send({msg:"Crew Added"})
    }
  }else{
    return res.status(400).send({msg:"Failed!"})
  }
});
//push crew to device
const pushCrewData = catchAsync(async (req:Request, res:Response, next:NextFunction):Promise<any> => {
  const { error } = pushCrewDetails.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message,400));
  }
  const isSend=await deviceAPIService.pushRegisterCrew(req.body.cardNo,req.body.employeeId,req.body.name,req.body.image)
    if(isSend.Status===true){
    await service.updateDeliveredStatus(String(req.body.crewId))
    return res.status(200).send({msg:"Success"})
  }else{
    return res.status(400).send({msg:"Failed!"})
    }
});
//register crew thumb 
const registerCrewThumb = catchAsync(async (req:Request, res:Response, next:NextFunction):Promise<any> => {
  const { error } = registerThumb.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message,400));
  }
  const thumbImpression=await deviceAPIService.registerThumbImpression(req.body.cardNo)
  if(thumbImpression.Status===true && thumbImpression.Data.FPData!==null){
  // const isRegistered=await service.isRegistered(req.body.employId,req.body.cardNo);
  // if(isRegistered){
  //   return res.status(400).send({msg:"Thumb impression already registered"})
  // }
  //  if (!isBase64(thumbImpression.Data.FPData)) {
  //   return res.status(400).send({msg:"Please send thumb impression into base64 encoded!"});
  // }
  const crew = await service.registerThumb(req.body.cardNo,thumbImpression.Data.FPData);
  if(crew===1){
    return res.status(200).send({msg:"Crew thumb registered"})
  }else{
    return res.status(400).send({msg:"Failed!"})
  }
}else{
   return res.status(400).send({msg:"Crew thumb impression does't exist on device!"})
  }
});
//verify thumb impression
const verifyThumbImpression = catchAsync(async (req:Request, res:Response, next:NextFunction):Promise<any> => {
  const { error } = verifyThumb.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message,400));
  }
   if (!isBase64(req.body.thumbImpression)) {
    return res.status(400).send({msg:"Please send thumb impression into base64 encoded!"});
  }
  const crew = await service.verifyThumbImpression(req.body.thumbImpression);
  if(crew){
    return res.status(200).send({msg:"Crew thumb verified"})
  }else{
    return res.status(400).send({msg:"Failed!"})
  }
});
//* getAll
const getAll = catchAsync(async (req: Request, res: Response):Promise<any> => {
  const crews= await service.getAll();
  return res.status(200).send({msg:"Crew List",data:crews});
});
//* getAll verified
const getAllVerified = catchAsync(async (req: Request, res: Response):Promise<any> => {
  const crews= await service.getAllVerified(req.params.airLine);
  return res.status(200).send({msg:"Crew List",data:crews});
});
//get list by airline
const getCrewsByAirLine = catchAsync(async (req: Request, res: Response):Promise<any> => {
  const crews= await service.getCrewsByAirLine(req.params.airLine);
  return res.status(200).send({msg:"Crew List",data:crews});
});
  //* getOne
  const getOne =catchAsync(async (req: Request, res: Response):Promise<any> => {
    const crew = await service.getOne(req.params.id);
    if(crew){
        return res.status(200).send({msg:"Crew",data:crew});
    }else{
        return res.status(404).send({msg:"Not Found!"});
    }
  });


//* update
const update = asyncHandler(async (req:Request, res:Response, next:Function):Promise<any> => {
  const { error } = updateCrew.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message,400));
  }
    const result = await service.update(String(req.params.id),req.body);
    if (result.affected) {
       return  res.status(200).send({ msg: "Crew Updated" })
    } else {
      return  res.status(400).send({ msg: "Failed!" })
    }
});
const deleteCrew=asyncHandler(async(req:Request,res:Response,next:Function):Promise<any>=>{
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
 return res.status(400).send({msg:"failed!"})
  }
});
export default {create,getAll,getOne,update,deleteCrew,getCrewsByAirLine,registerCrewThumb,verifyThumbImpression,getAllVerified,pushCrewData}
