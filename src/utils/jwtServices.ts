import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
const jwtServices={
    create:async(data:object,expiresIn?:string)=>{
        const jwtKey=process.env.JWT_SECRET
        if(!jwtKey){
       throw new Error("JWT secret key not found in environment variables");          }
        if(process.env.NODE_ENV==='development'){
            expiresIn='5 min';
        }
        const expiredIn=expiresIn||'365d'
        console.log(data)
       const token=  jwt.sign(data, jwtKey,{expiresIn:expiredIn});    
       return  token
},
    authenticate:async(token:string)=>{
    const jwtKey=process.env.JWT_SECRET;
    if(!jwtKey){
       throw new Error("JWT secret key not found in environment variables");   
    }
    const verifyToken= jwt.verify(token,jwtKey)
    return verifyToken
}
}
export default jwtServices