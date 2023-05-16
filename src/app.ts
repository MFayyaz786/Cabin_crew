import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';

import userRouter from './resources/user/router';
import globalErrorHandler from './middleware/errorHandler.middleware';
import AppError from './utils/appError';
import ErrorHandler from "./middleware/errorHandler.middleware";

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

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

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Welcome To   " });
});

// app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.use(ErrorHandler)

// handling all (get,post,update,delete.....) unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

// error handling middleware
app.use(globalErrorHandler); 

export default app;
