import { Request,Response ,NextFunction} from "express";
import asyncHandler from "express-async-handler"
import { validate } from 'class-validator';
import UserService from "./service"
import  User  from "../../entities/user";


//* createUser
const create = asyncHandler(async (req:Request, res:Response, next:NextFunction):Promise<any> => {

const errors = await validate(req.body);
if (errors.length > 0) {
  const errorMessages = errors.map((error) => Object.values(error.constraints || {})).flat();
  res.status(400).json({ msg: "Validation Failed!", errors: errorMessages });
  return next();
}

const user: User = await UserService.create(req.body);
return user ? res.status(201).json(user) : res.status(500).json({ error: "User creation failed" });

});

//* getAll
const getAll = async (_: Request, res: Response) => {
  const users: User[] = await UserService.getAll();
  return res.status(200).json(users);
};

//* getOne
const getOne = async (req: Request, res: Response) => {
  const user: User | null = await UserService.getOne(Number(req.params.id));
  return user ? res.status(200).json(user) : res.status(404).json({ error: "User not found" });
};


//* update
const update = async (req: Request, res: Response) => {
  const user: User | null = await UserService.update(Number(req.params.id), req.body);
  return user ? res.status(200).json(user) : res.status(500).json({ error: "User update failed" });
};

//* delete
const deleteUser=asyncHandler(async(req:Request,res:Response,next:Function):Promise<any>=>{
  const success: boolean = await UserService.delete(Number(req.params.id));
  return success ? res.status(200).json({ message: "User deleted" }) : res.status(404).json({ error: "User not found" });
});

export default {create,getAll,getOne,update,deleteUser}