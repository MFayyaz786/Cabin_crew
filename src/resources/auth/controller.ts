import { Request,Response ,NextFunction} from "express";
import asyncHandler from "express-async-handler"
import {userSchema}  from './validator';
import AuthService from "./service"
import  User  from "../../entities/user";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/appError";


//* REFRESH TOKEN
const refreshToken = catchAsync(async (req:Request, res:Response, next:NextFunction):Promise<any> => {
  const {token}=req.body;
  if (!token) {
    return next(new AppError('Access denied, token missing!', 403));
  }
  const { accessToken, refreshToken } = await AuthService.refreshToken(token,next);
  res.status(200).send({ message: 'success', accessToken, refreshToken });
});

//* SIGNUP
const signUp = catchAsync(async (req:Request, res:Response, next:NextFunction):Promise<any> => {
  const {user,accessToken, refreshToken} = await AuthService.signUp(req.body);
  res.send({user, accessToken, refreshToken });
});

//* SIGNIN
const signIn = catchAsync(async (req: Request, res: Response):Promise<any> => {
  console.log('req.body :>> ', req.body);

  const {email,password} = req.body;
  const { accessToken, refreshToken } = await AuthService.signIn(email,password);
  res.send({ accessToken, refreshToken });
});

  //* UPDATE PASSWORD
const updatePassword =catchAsync(async (req: Request, res: Response):Promise<any> => {
  await AuthService.updatePassword(req.body.userId, req.body.newPassword);
  res.send({ message: 'Password updated successfully' });
});


//* FORGOT PASSWORD
const forgotPassword =catchAsync(async (req: Request, res: Response,next:NextFunction):Promise<any>=> {
  await AuthService.forgotPassword(req.body.email);
  res.send({ message: 'Password reset link has been sent to your email' });
});

//* VERIFy OTP
const verifyOTP=catchAsync(async(req:Request,res:Response,next:Function):Promise<any>=>{
  const {userId,code} = req.body;
  await AuthService.verifyOTP(userId,code);
  res.send({ message: 'OTP confirmed' });
});

//* GENERATE OTP
const generateOTP=catchAsync(async(req:Request,res:Response,next:Function):Promise<any>=>{
  const {phone} = req.body;
  await AuthService.generateOTP(phone);
  res.send({ message: 'OTP sent to your Number' });
});

//* RESET PASSWORD
const resetPassword=catchAsync(async(req:Request,res:Response,next:Function):Promise<any>=>{
  await AuthService.resetPassword(req.body.userId, req.body.resetToken, req.body.newPassword);
  res.send({ message: 'Password reset successfully' });
});

export default {signUp,signIn,updatePassword,forgotPassword,verifyOTP,resetPassword,refreshToken,generateOTP}
