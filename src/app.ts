import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import { Request,Response } from "express";


import globalErrorHandler from './middleware/errorHandler.middleware';
import AppError from './utils/appError';
import ErrorHandler from "./middleware/errorHandler.middleware";

//* Routers
import userRouter from './resources/user/router';
import authRouter from './resources/auth/router';
import airlineTypeRouter from "./resources/airlineType/router";
import boothRouter from "./resources/booth/router";



const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
// app.get("/favicon.ico", (req, res) => {
//   // Send an appropriate response for the favicon.ico route
//   res.sendStatus(204); // No Content
// });


app.use(cors());

// app.ts
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

// server.ts
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add your controllers here
 


//* Routing 
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/airline', airlineTypeRouter);
app.use('/api/v1/booth', boothRouter);
app.get("/",(req,res,next)=>{
    res.status(200).send({msg:"Welcome to AIR_PORT_CABIN_CREW"})
    next()
});
app.use("/",(req,res)=>{
  res.status(404).send({msg:"Route not found"})
})
app.use((req, res, next) => {
  console.log(`Route called: ${req.originalUrl}`);
  next();
});

//app.use(ErrorHandler)

// handling all (get,post,update,delete.....) unhandled routes
// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
// });

// error handling middleware
app.use(globalErrorHandler); 

export default app;
