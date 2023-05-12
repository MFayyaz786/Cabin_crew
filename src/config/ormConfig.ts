// require('dotenv').config();
// import { DataSource } from 'typeorm';
//const {User}=require('../resources/user/userEntity')

// const connectDB  = new DataSource({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port:  Number(process.env.DB_PORT || '5432'),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   logging: true,
//   synchronize: true,
//   entities: [User],
//   migrations: [
//     "src/migration/**/*.ts"
//   ],
//   subscribers: [
//     "src/subscriber/**/*.ts"
//   ],
// });

// const connectionPromise = connectDB.initialize(); // Get the connection promise

// connectionPromise.then(() => {
//   console.log('Connected to the database');
// }).catch((error:any) => {
//   console.error('Error connecting to the database:', error);
//   process.exit(1);
// });

// export default connectionPromise ;

require('dotenv').config();
import "reflect-metadata";
import { createConnection } from "typeorm";

export default createConnection({
 name:process.env.DB_DATABASE,
 type: "postgres",
 host: process.env.DB_HOST,
 port: Number(process.env.DB_PORT || '5432'),
 username: process.env.DB_USERNAME,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_DATABASE,
 entities: ["src/entities/*{.ts,.js}"],
 synchronize: true,
 logging: true,

}).then(connection => {
  console.log('Connected to the database',connection);
}).catch(error => {
 console.error('Error connecting to the database:', error);
 process.exit(1);
});