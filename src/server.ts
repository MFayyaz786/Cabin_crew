import dotenv from "dotenv";
import colors from 'colors'
import "./db/index"
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import globalErrorHandler from './middleware/errorHandler.middleware';
//* Routers
import userRouter from './resources/user/router';
import authRouter from './resources/auth/router';
import airlineTypeRouter from "./resources/airlineType/router";
import boothRouter from "./resources/booth/router";
import flightRouter from "./resources/flight/router";
import crewRouter from "./resources/crew/router";
import flightSchedule from "./resources/flightSchedule/router";
import deviceRouter from "./resources/device/router";
const app = express();
const corsOption={
 origin: "*", // or specify the allowed origins
}
 app.use(cors(corsOption));
app.use(express.json());
app.use(morgan('dev'));
app.get("/",(req,res)=>{
    res.status(200).send({msg:"Welcome to AIR_PORT_CABIN_CREW"})
});
app.use((req, res, next) => {
  console.log(`Route called: ${req.originalUrl}`);
  next()
});
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
// app.ts
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

//server.ts
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
}
//* Routing 
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/airline', airlineTypeRouter);
app.use('/api/v1/booth', boothRouter);
app.use('/api/v1/flight', flightRouter);
app.use('/api/v1/crew', crewRouter);
app.use('/api/v1/flightSchedule', flightSchedule);
app.use('/api/v1/device', deviceRouter);
app.use("/",(req,res)=>{
  res.status(404).send({msg:"Route not found"})
})
const port=process.env.PORT|| 6001;
// error handling middleware
app.use(globalErrorHandler); 
app.listen(port,()=>{
    console.log(colors.yellow.bold(`--------------------------------------------------------`));
    console.log(colors.yellow.bold(`App is running on port : ${port}`));
    console.log(colors.yellow.bold(`Current Environment : ${process.env.NODE_ENV}`));
    console.log(colors.yellow.bold(`--------------------------------------------------------`));
})



  