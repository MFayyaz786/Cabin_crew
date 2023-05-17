// require('dotenv').config();
// import  "reflect-metadata";
// import {DataSource} from "typeorm";
//   const DBConnect=new DataSource({
// type:"postgres",
// host:process.env.HOST,
// port:Number(process.env.DB_PORT || '5432'),
// username:process.env.USER,
// password:process.env.PASSWORD,
// database:process.env.DATABASE,
// entities:["src/entities/*{.ts,.js}"],
// synchronize: true,
// logging: true, 
// });
// DBConnect.initialize().then(() => {
//   console.log('Connected to the database');
// }).catch((error) => {
//   console.error('Error connecting to the database:', error);
//   process.exit(1);
// });
// export default DBConnect

require('dotenv').config();
import "reflect-metadata";
import { createConnection } from "typeorm";
import colors from 'colors'

export default createConnection({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["src/entities/*{.ts,.js}"],
  synchronize: true,
  logging: false,
}).then(connection => {
  console.log(colors.yellow.bold('Connected to the database'));
  console.log(colors.yellow.bold(`--------------------------------------------------------`));
}).catch(error => {
  console.error('Error connecting to the database:', error);
  process.exit(1);
});