import asyncHandler from "express-async-handler"
import service from "./service"
import { Request,Response } from "express";
import validator from "./validator";
const {addNewSchema}=validator
import AppError from "../../utils/appError";
const addNew = asyncHandler(async (req:Request, res:Response, next:Function):Promise<any> => {
  const {error}= addNewSchema.validate(req.body);
  if(error){
    return next(new AppError(error.details[0].message,400));
  }
    const result = await service.add(req.body);
        console.log(result)
    if (result) {
       return  res.status(201).send({ msg: "Success" })
    } else {
      return  res.status(400).send({ msg: "Failed!" })
    }
   // return next();
});
const getAll = asyncHandler(async (req:Request, res:Response, next:Function):Promise<any> => {
    const result = await service.getAll();
    return res.status(200).send({ msg: "list",data:result })
    //return next();
});
const getOne = asyncHandler(async (req: Request, res: Response, next: Function):Promise<any> => {
  const result = await service.getOne(String(req.query.id));
  if(result){
   return res.status(200).send({ msg: "Airline", data: result })
  }else{
  return res.status(404).send({ msg: "Not Found" })
  }
  //return next();
})
const updateAirLine = asyncHandler(async (req: Request, res: Response, next: Function):Promise<any> => {
  const result = await service.update(String(req.body.id),req.body);
  if(result.affected){
   return res.status(200).send({ msg: "Updated" })
  }else{
  return res.status(404).send({ msg: "Failed!" })
  }
  //return next();
})
export default {addNew,getAll,getOne,updateAirLine}