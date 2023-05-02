const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/ormConfig');
const appp = require('./app');

dotenv.config();

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  console.error(err.stack);
  process.exit(1);
});

connectDB;

const port = process.env.PORT || 7001;
const server = appp.listen(port, () => {
  console.log(colors.yellow.bold(`App is running on port ${port}`));
});

process.on('unhandledRejection', (error:any) => {
  console.log('Unhandled Rejection => shutting down..... ');
  console.log(error.name, error.message);
  server.close(() => {
    process.exit(1);
  });
});

if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
}
