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
const app = express();
const corsOption={
 origin: "*", // or specify the allowed origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // specify the allowed methods
  allowedHeaders: "Content-Type,Authorization", // specify the allowed headers
}
app.use(cors(corsOption));
app.get("/",(req,res)=>{
    res.status(200).send({msg:"Welcome to AIR_PORT_CABIN_CREW"})
});
app.use((req, res, next) => {
  console.log(`Route called: ${req.originalUrl}`);
  next()
});
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.ts
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// } else if (process.env.NODE_ENV === 'production') {
//   app.use(helmet());
// }

// server.ts
// if (process.env.NODE_ENV === 'production') {
//   console.log = () => {};
//   console.error = () => {};
//   console.warn = () => {};
// }
//* Routing 
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/airline', airlineTypeRouter);
app.use('/api/v1/booth', boothRouter);
app.use("/",(req,res)=>{
  res.status(404).send({msg:"Route not found"})
})
// error handling middleware
app.use(globalErrorHandler); 

export default app;
