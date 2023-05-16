import dotenv from "dotenv";
import colors from 'colors'
import "./db/index"

import app from './app'

dotenv.config();


process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    console.error(err.stack);
    process.exit(1);
});

  
const port=process.env.PORT|| 6001;
const server=app.listen(port,()=>{
    console.log(colors.yellow.bold(`--------------------------------------------------------`));
    console.log(colors.yellow.bold(`App is running on port ${port}`));
    console.log(colors.yellow.bold(`Current Environment: ${process.env.NODE_ENV}`));
    console.log(colors.yellow.bold(`--------------------------------------------------------`));
})

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

  