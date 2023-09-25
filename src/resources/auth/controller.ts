import asyncHandler from "express-async-handler"
import service from "./service"
import User from '../../entities/user';
import { Request,Response } from "express";
import AppError from "../../utils/appError";
import { string } from "joi";
import OTP from "../../utils/OTP";
import validator from "./validator"
import jwtServices from "../../utils/jwtServices";
import { v4 as uuidv4 } from 'uuid';
import authIdService from "../auth/service"
import { JwtPayload } from "jsonwebtoken";
import smsServices from "../../utils/smsService";
import airLineService from "../airlineType/service"
const {registered, updateProfile,requestOtp,verifyOtpBody,resetPasswordBody ,forgotPasswordBody}=validator
const create = asyncHandler(async (req:Request, res:Response, next:Function):Promise<any>=> {
  try {
  const {error}= registered.validate(req.body);
  if(error){
    return next(new AppError(error.details[0].message,400));
  }
  console.log(req.body);
    const result = await service.create(req.body);
    if (result) {
      const uuid = uuidv4();
      const refreshToken =await jwtServices.create({uuid, type: result.role} );
      const accessToken =await jwtServices.create(
        { userId: result.id,type: result.role },
        "5m"
      );      
      service.add(result.id,String(uuid));
      return   res.status(201).send({ msg: "User registered successfully",accessToken,refreshToken })
    } else {
      return  res.status(200).send({ msg: "Failed!" })
    }
    } catch (error) {
    console.log(error)
  }
        
  
    //return next();
});

const login=  asyncHandler(async (req:Request, res:Response,next:Function):Promise<any> => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ msg: "Fields Missing" });
    }
    const user = await service.login(email);
    if (user) {
      if(user.role!=='Air_Port_Manager'){
      const isActiveAirLine=await airLineService.getOne(String(user.airLine.id))
      if(!isActiveAirLine.isActive){
        return res.status(400).send({msg:"Air Line currently inActive!"})
      }
    }
      const validatePassword = await service.validatePassword(
        password,
        user.password
      );
      if (validatePassword) {
        res.status(200).send({
          msg: "Login Successfully",
          data: user,
        });
      } else {
        res.status(401).send({
          msg: "Invalid Credentials!",
        });
      }
    } else {
      res.status(401).send({
        msg: "Invalid Credentials!",
      });
    }
  });
const getAll = asyncHandler(async (req:Request, res:Response, next:Function):Promise<any> => {
    const result = await service.getAll();
    return res.status(200).send({ msg: "list",data:result })
    //return next();
});
const getOne = asyncHandler(async (req: Request, res: Response, next: Function):Promise<any> => {
  const result = await service.getOne(String(req.query.id));
  if(result){
   return res.status(200).send({ msg: "User", data: result })
  }else{
  return res.status(404).send({ msg: "Not Found" })
  }
  //return next();
})
const update = asyncHandler(async (req:Request, res:Response, next:Function):Promise<any> => {
  const {error}= updateProfile.validate(req.body);
  if(error){
    return next(new AppError(error.details[0].message,400));
  }
    const result = await service.update(String(req.body.id),req.body);
        console.log(result)
    if (result.affected) {
       return  res.status(200).send({ msg: "Profile Updated" })
    } else {
      return  res.status(400).send({ msg: "Failed!" })
    }
   // return next();
});
const sendOtp=asyncHandler(async(req:Request,res:Response,next:Function):Promise<any>=>{
   const {error}= requestOtp.validate(req.body);
  if(error){
    return next(new AppError(error.details[0].message,400));
  }
  const otp=OTP()
  const result =await service.requestOtp(Number(otp),String(req.body.email));
  if(result){
    return res.status(200).send({msg:"OTP sent"})
  }else{
    return res.status(400).send({msg:"OTP not sent"})
  }
})
const verifyOtp=asyncHandler(async(req:Request,res:Response,next:Function):Promise<any>=>{
   const {error}= verifyOtpBody.validate(req.body);
  if(error){
    return next(new AppError(error.details[0].message,400));
  }
  const isValidateExpireOtp=await service.otpExpiryValidation(String(req.body.email));
  if(!isValidateExpireOtp){
    return res.status(400).send({msg:"OTP expire please try again"})
  }
  const isValidOtp =await service.isValidOtp(Number(req.body.otp),String(req.body.email));
  if(isValidOtp.affected){
    return res.status(200).send({msg:"OTP Verified"})
  }else{
    return res.status(400).send({msg:"OTP invalid!"})
  }
});
const resetPassword=asyncHandler(async(req:Request,res:Response,next:Function):Promise<any>=>{
   const {error}= resetPasswordBody.validate(req.body);
  if(error){
    return next(new AppError(error.details[0].message,400));
  }
  const {id,password}=req.body;
  const result =await service.resetPassword(String(id),String(password));
  if(result.affected){
    return res.status(200).send({msg:"Password has been changed successfully"})
  }else{
    return res.status(400).send({msg:"Failed!"})
    
  }
});
const forgotPassword=asyncHandler(async (req:Request, res:Response,next:Function):Promise<any> => {
  const {error}= forgotPasswordBody.validate(req.body);
  if(error){
    return next(new AppError(error.details[0].message,400));
  }
    const { email, password } = req.body;
    const result = await service.forgotPassword(email, password);
    if (result.affected) {
      return res.status(200).send({ msg: "Password Updated successfully" });
    } else {
      return res.status(400).send({ msg: "Password not Updated" });
    }
  });
const deleteUser=asyncHandler(async(req:Request,res:Response,next:Function):Promise<any>=>{
  const result =await service.delete(String(req.query.id));
  if(result.affected===0){
   return res.status(404).send({msg:"Not Found!"})
  }
  if(result){
   return res.status(400).send({
      msg:"deleted"
    })
  }else{
 return res.status(400).send({msg:"failed"})
  }
});

const refreshToken= asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    const verifyToken =await jwtServices.authenticate(refreshToken) as JwtPayload;
    if (verifyToken) {
      const { uuid, type, } = verifyToken;
      const AuthId = await service.findByUUID(String(uuid));
      if (AuthId) {
        const { userId } = AuthId; 
        if (userId) {
          const accessToken =await jwtServices.create({ userId, type }, "5m");
          res.status(200).send({ msg: "access Token", data: { accessToken } });
        } else {
          res.status(401).send({ msg: "Login please" });
        }
      } else {
        res.status(401).send({ msg: "Login please" });
      }
    } else {
      res.status(401).send({ msg: "Login please" });
    }
  });
export default {create,getAll,getOne,update,deleteUser,sendOtp,verifyOtp,resetPassword,forgotPassword,login,refreshToken}