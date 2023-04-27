import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';


// routes
// import authRouter from './resources/auth/router';
import userRouter from './resources/user/router';
import globalErrorHandler from './middleware/error.middleware';

import AppError from './utils/helpers/appError';


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add your controllers here

app.get("/", (req, res, next) => {
  res.status(200).send({ msg: "Welcome To Ais-Project-Invoicing" });
});


// app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

// handling all (get,post,update,delete.....) unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});


// error handling middleware
app.use(globalErrorHandler);

export default app;
