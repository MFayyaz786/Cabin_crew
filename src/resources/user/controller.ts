import asyncHandler from "express-async-handler"
import service from "./service"
import User from '../../entities/user';
import { Request,Response } from "express";
import { validate } from 'class-validator';

const create = asyncHandler(async (req:Request, res:Response, next:Function) => {
    if (!req.body) {
    return res.status(400).send({ msg: "Bad request" });
  }
// const user = new User();
//   user.name = req.body.name;
//   user.email = req.body.email;
//   user.password = req.body.password;
// const error=await validate(user);
// if(error.length>0){
// const errorMessages = error.map((error) => Object.values(error.constraints || {})).flat();
//   console.log(error);
// return res.status(400).send({msg:"Validation Failed!",errors:errorMessages})
// }

//     const {name ,email}=req.body;
//     console.log(name,email)
    const result = await service.create(req.body);
    if (result) {
         res.status(201).send({ msg: "User registered successfully" })
    } else {
        res.status(400).send({ msg: "Failed" })
    }
    return next();
});
const getAll = asyncHandler(async (req:Request, res:Response, next:Function) => {
    const result = await service.getAll();
    res.status(200).send({ msg: "list",data:result })
    return next();
});
const getOne = asyncHandler(async (req: Request, res: Response, next: Function) => {
   // const number :id=req.query
// const id = parseInt(req.query.id as string);
  const result = await service.getOne(Number(req.query.id));
  if(result){
    res.status(200).send({ msg: "user", data: result })
  }else{
   res.status(404).send({ msg: "Not Found" })
  }
  return next();
})
const update = asyncHandler(async (req:Request, res:Response, next:Function) => {
//     if (!req.body) {
//     return res.status(400).send({ msg: "Bad request" });
//   }
    const {name ,email}=req.body;
    console.log(name,email)
    const result = await service.update(Number(req.body.id),req.body);
    if (result) {
         res.status(200).send({ msg: "success" })
    } else {
        res.status(200).send({ msg: "success" })
    }
    return next();
});
const deleteUser=asyncHandler(async(req:Request,res:Response,next:Function)=>{
  const result =await service.delete(Number(req.query.id));
  if(result.affected===0){
   return res.status(404).send({msg:"Not Found!"})
  }
  if(result){
   return res.status(400).send({
      msg:"deleted"
    })
  }else{
  return  res.status(400).send({msg:"failed"})
  }
  return next()
});
export default {create,getAll,getOne,update,deleteUser}