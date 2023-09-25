import { string } from 'joi';
import User from '../../entities/user';
import Auth from "../../entities/auth";
import bcrypt from "bcrypt"
import {getConnection,getRepository,MoreThanOrEqual,UpdateResult} from 'typeorm';
const authRepo = getRepository(Auth);
import jwtServices from "../../utils/jwtServices";
import { v4 as uuidv4 } from 'uuid';
import authIdService from "../auth/service"
import smsServices from '../../utils/smsService';
const userRepo = getRepository(User);
export  const service=  {
  create:async(userData: User) => {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
    console.log("userdata",userData)
    const users =  userRepo.create(userData);
    await userRepo.save(users);
    return  users;
  },
   login: async (email:string) => {
    let user = await userRepo.findOne({where:{ email },select:["phone","id","role","firstName","lastName","password"],relations:['airLine']});
    if (user) {
      const uuid = uuidv4();
      console.log("uuid",uuid)
      const refreshToken =await jwtServices.create({ uuid, type: user.role });
      const accessToken =await jwtServices.create(
        { userId: user.id, type: user.role },
        "5m"
      );
      await service.add(user.id, String(uuid));
      await userRepo.update(
        { id: user.id },
        { token: String(accessToken) }
      );
        user=Object.assign({},user,{accessToken,refreshToken});
    }
    return user
   },
   validatePassword: async (password:string, realPassword:string) => {
    console.log(password, realPassword);
    const valid = await bcrypt.compare(password, realPassword);
    return valid;
  },
  getAll:async ()=>{
    const result=await userRepo.find({select:["firstName","lastName","email","phone","id",]});
    //,relations:["role"]});
    return result
  },
getOne: async (id: string) => {
  const user = await userRepo.findOne({where:{id:id},select:["id","firstName","lastName","email","phone"]});
  return user;
},
update:async(id:string,userData:User)=>{
const result=await userRepo.
// .createQueryBuilder()
//   .update(User)
//   .set(userData)
//   .where( { id: id })
//   .returning("*") // Specify the columns you want to retrieve
//   .execute();
update({id},userData);
return result;
},
requestOtp:async(otp:number,email:string)=>{
const otpExpire=new Date(new Date().getTime() + 5 * 60000);
const result=await userRepo
  .createQueryBuilder()
  .update(User)
  .set({ otp, otpExpire })
  .where({ email }).returning("*")
  .execute();
//.update({email},{otp,otpExpire})
if(result.affected){
await smsServices.sendSMS(String(`Your otp is ${otp}`),String(result.raw[0].phone))
}
return result.raw[0]
},
otpExpiryValidation:async(email:string)=>{
  const result =await userRepo.findOne({where:{email,otpExpire:MoreThanOrEqual(new Date())}});
  return result
},
isValidOtp:async(otp:number,email:string)=>{
  const result =await userRepo.update({email:email,otp:otp},{otp:null});
  return result
},
resetPassword:async(id:string,password:string)=>{
 const salt = await bcrypt.genSalt(10);
     password =await  bcrypt.hash(password, salt);
    const result=await userRepo.update({id},{password})
    return result
},
forgotPassword: async (email:string, password:string) => {
    console.log(email, password);
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const result = await userRepo.update({ email },{ password });
    return result;
  },
delete:async(id:string)=>{
  const result=await userRepo.delete({id});
  console.log("result is",result);
  
  return result
},
add: async (userId:string, uuid:string) => {
    const result:UpdateResult = await authRepo.update({ userId }, {uuid});
    if (result.affected) {
      return result;
    }
    const newAuthId = await authRepo.create({ userId, uuid });
    await authRepo.save(newAuthId)
    console.log(newAuthId)
    return newAuthId;
  },

findByUUID: async (uuid:string) => {
    const result = await authRepo.findOne({where:{ uuid }});
    return result;
  },
};
export default service
