import express from "express";
import dotenv from "dotenv";
import ErrorHandler from "./middleware/errorHandler";
import "./db/index"

dotenv.config()
import userRouter from "./resources/user/router"

const app=express();
const port=process.env.PORT|| 4500;
app.use(express.json())
app.use("/api/user",userRouter)
app.get("/",(req,res)=>{
res.status(200).send({msg:"welcome to Air port facilitate system"});
})

app.use(ErrorHandler)
app.listen(port,()=>{
console.log(`server is running... ${port}`);
})