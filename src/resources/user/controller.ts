import { Request,Response ,NextFunction} from "express";
import asyncHandler from "express-async-handler"
import userSchema  from './validator';
import UserService from "./service"
import  User  from "../../entities/User";
import catchAsync from "../../utils/catchAsync";

//* createUser
const create = catchAsync(async (req:Request, res:Response, next:NextFunction):Promise<any> => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const user: User = await UserService.create(req.body);
  return user ? res.status(201).json(user) : res.status(500).json({ error: "User creation failed" });
});

//* getAll
const getAll = catchAsync(async (req: Request, res: Response):Promise<any> => {
  const users= await UserService.getAll(req.query);
  return res.status(200).json(users);
});

  //* getOne
  const getOne =catchAsync(async (req: Request, res: Response):Promise<any> => {
    const user = await UserService.getOne(req.params.id);
    return user ? res.status(200).json(user) : res.status(404).json({ error: "User not found" });
  });


//* update
const update =catchAsync(async (req: Request, res: Response,next:NextFunction):Promise<any>=> {
  const user = await UserService.update(req.params.id, req.body,next);
  return user ? res.status(200).json(user) : res.status(500).json({ error: "User update failed" });
});

//* delete
const deleteUser=catchAsync(async(req:Request,res:Response,next:Function):Promise<any>=>{
  const success: boolean = await UserService.delete(req.params.id);
  return success ? res.status(200).json({ message: "User deleted" }) : res.status(404).json({ error: "User not found" });
});

export default {create,getAll,getOne,update,deleteUser}