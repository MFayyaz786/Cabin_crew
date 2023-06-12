import { Request,Response ,NextFunction} from "express";
import asyncHandler from "express-async-handler"
import userSchema  from './validator';
import UserService from "./service"
import  User  from "../../entities/user";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/appError";
import validator from "./validator";
const {registered,updateProfile}=validator
//* createUser
const create = catchAsync(async (req:Request, res:Response, next:NextFunction):Promise<any> => {
  const { error } = registered.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message,400));
  }
  console.log(req.body);
  
  const user = await UserService.create(req.body);
  if(user){
  return res.status(201).send({msg:"Created"})
   }else{ 
    return res.status(400).send({ msg: "Failed!" });
  }
});

//* getAll
const getAll = catchAsync(async (req: Request, res: Response):Promise<any> => {
  const users= await UserService.getAll();
  return res.status(200).json(users);
});
// get air manager list
const getAirLineManagers = catchAsync(async (req: Request, res: Response):Promise<any> => {
  const users= await UserService.getAirLineManagers();
  return res.status(200).json(users);
});
  //* getOne
  const getOne =catchAsync(async (req: Request, res: Response):Promise<any> => {
    const user = await UserService.getOne(req.params.id);
    if(user){
    return  res.status(200).send({msg:"User",data:user}) 
     }
     else{
      return res.status(404).send({ msg: "User not found" });
    }
  });


//* update
const update = asyncHandler(async (req:Request, res:Response, next:Function):Promise<any> => {
  const { error } = updateProfile.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message,400));
  }
    const result = await UserService.update(String(req.params.id),req.body);
    if (result.affected) {
       return  res.status(200).send({ msg: "Profile Updated" })
    } else {
      return  res.status(400).send({ msg: "Failed!" })
    }
   // return next();
});
const deleteUser=asyncHandler(async(req:Request,res:Response,next:Function):Promise<any>=>{
  const result =await UserService.delete(String(req.params.id));
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
export default {create,getAll,getOne,update,deleteUser,getAirLineManagers}