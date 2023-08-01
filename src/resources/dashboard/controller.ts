import { Request,Response ,NextFunction} from "express";
import asyncHandler from "express-async-handler"
import service from "./service"
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/appError";
//* Air port manager states
const getStates = catchAsync(async (req: Request, res: Response):Promise<any> => {
  const states= await service.getAll();
  return res.status(200).send({msg:"States",data:states});
});
//staff panel states
const getStaffStates = catchAsync(async (req: Request, res: Response):Promise<any> => {
  const flights= await service.getStaffStates();
  return res.status(200).send({msg:"States",data:flights});
});
  //* air line states
  const getAirLineStates =catchAsync(async (req: Request, res: Response):Promise<any> => {
    const flight = await service.getAirLineStates(req.params.id);
    return res.status(200).send({msg:"States",data:flight});
  });
export default {getStates,getAirLineStates,getStaffStates}