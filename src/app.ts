const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

const userRouter = require('./resources/user/router');
// const globalErrorHandler = require('./middleware/error.middleware');
// const AppError = require('./utils/helpers/appError');

const app= express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add your controllers here

app.get("/", (req:any, res:any) => {
  res.status(200).send({ msg: "Welcome To Airport_Cabin_Crew  " });
});

// app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

// handling all (get,post,update,delete.....) unhandled routes
// app.all('*', (req:any, res:any, next:any) => {
//   next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
// });

// error handling middleware
// app.use(globalErrorHandler); 

module.exports = app;
