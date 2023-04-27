const dotenv = require('dotenv');
const colors = require('colors');
const { DBConnect } = require('./config/ormConfig');
// const app = require('./app');
const express=require('express')
const app = express();


process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  console.error(err.stack);
  process.exit(1);
});

DBConnect.initialize().then(() => {
  const port = process.env.PORT || 7001;
  const server = app.listen(port, () => {
    console.log(colors.yellow.bold(`App is running on port ${port}`));
  });

  process.on('unhandledRejection', (error: any) => {
    console.log(' Unhandled Rejection => shutting down..... ');
    console.log(error.name, error.message);
    server.close(() => {
      process.exit(1);
    });
  });
}).catch((error:any) => {
  console.error('Error connecting to the database:', error);
  process.exit(1);
});
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
}
