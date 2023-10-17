import dotenv from "dotenv";
import colors from 'colors'
import "./db/index"
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
//import helmet from 'helmet';
import path from 'path';
import globalErrorHandler from './middleware/errorHandler.middleware';
import asyncHandler from "express-async-handler"

import { Request, Response, NextFunction } from 'express';
import { createConnection } from 'typeorm';
//* Routers
import userRouter from './resources/user/router';
import authRouter from './resources/auth/router';
import airlineTypeRouter from "./resources/airlineType/router";
import boothRouter from "./resources/booth/router";
import flightRouter from "./resources/flight/router";
import crewRouter from "./resources/crew/router";
import flightSchedule from "./resources/flightSchedule/router";
import deviceRouter from "./resources/device/router";
import statusRouter from "./resources/flightStatus/router"
import scheduleFlightCrewRouter from "./resources/scheduleFlightCrew/router"
import http from "http";
import  {Server as socket} from "socket.io";
import dashboardRouter from "./resources/dashboard/router"
import notificationRouter from "./resources/notification/router"
import deviceLogsRouter from "./resources/deviceAPIs/router"
import errorHandler from "./middleware/errorHandler";
import socketIds from "./utils/userSocketIds"
import "./utils/generateRSAKeyPare"
import encryptionService from "./utils/encryptionService";
import encryptionMiddleware from "./middleware/encryption.middleware";
import whatsAppBotRouter from "./resources/whatsAppBot/router";

const { decryptObject, encryptObject }=encryptionService
const {addUser,deleteUser}=socketIds
const app = express();
const server = http.createServer(app); // Create an http server using the Express app
const io:socket =new socket(server); // Create a socket.io instance using the http server
app.set("socket",io)
const corsOption={
 origin: "*", // or specify the allowed origins
}
io.on("connection",(socket)=>{
  const userId=socket.handshake.query.userId;
  const socketId=socket.id
  addUser(userId,socketId)
  socket.on("disconnect", () => { 
    deleteUser(socket.id)
    console.log("disconnected");
  })
})
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
//if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
// } else if (process.env.NODE_ENV === 'production') {
//   app.use(helmet());
// }

//server.ts
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
}

app.post(
  "/encrypt",
  asyncHandler(async (req, res) => {
    res.status(200).send(encryptObject(req.body));
  })
);

app.post(
  "/decrypt",
  asyncHandler(async (req, res) => {
    res.status(200).send(decryptObject(req?.body?.cipher));
  })
);
//app.use(encryptionMiddleware)
//* Routing 
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/airline', airlineTypeRouter);
app.use('/api/v1/booth', boothRouter);
app.use('/api/v1/flight', flightRouter);
app.use('/api/v1/crew', crewRouter);
app.use('/api/v1/flightSchedule', flightSchedule);
app.use('/api/v1/device', deviceRouter);
app.use('/api/v1/status', statusRouter);
app.use('/api/v1/flightCrew', scheduleFlightCrewRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/notification', notificationRouter);
app.use('/api/v1/logs', deviceLogsRouter);
app.use('/api/v1/whatsAppBot', whatsAppBotRouter);



app.use("/",(req,res)=>{
  res.status(404).send({msg:"Route not found"})
})
const port=process.env.PORT|| 6001;
// Error handling middleware
// app.use(
//   (err: any, req: Request, res: Response, next: NextFunction) => errorHandler(err, req, res, next)
// );
// error handling middleware
app.use(globalErrorHandler); 
server.listen(port,()=>{
    console.log(colors.yellow.bold(`--------------------------------------------------------`));
    console.log(colors.yellow.bold(`App is running on port : ${port}`));
     console.log(colors.yellow.bold(`Current Environment : ${process.env.NODE_ENV}`));
     console.log(colors.yellow.bold(`--------------------------------------------------------`));
})
//"start": "npm run build && pm2 start ./dist/server.js --name cabin_crew",
//hello


  