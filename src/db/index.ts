require('dotenv').config();
import "reflect-metadata";
import { createConnection } from "typeorm";
import colors from 'colors'
import User from "../entities/user";
import AirlineType from "../entities/airlineType";
import Flight from "../entities/flight";
import Booth from "../entities/booth";
import Devices from "../entities/device";
import Auth from "../entities/auth";
import Crew from "../entities/crew";
import FlightSchedule from "../entities/flightSchedule";
import scheduleFlightCrew from "../entities/scheduleFlightCrew";
import Statuses from "../entities/flightStatus";
import DeviceAPILog from "../entities/deviceAPILog";


export default createConnection({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User,AirlineType,Booth,Devices,Crew,Flight,FlightSchedule,scheduleFlightCrew,Auth,Statuses,DeviceAPILog],
  synchronize: true,
  logging: false,
}).then(connection => {
  console.log(colors.yellow.bold('Connected to the database :) '));
  console.log(colors.yellow.bold(`--------------------------------------------------------`));
}).catch(error => {
  console.error('Error connecting to the database:', error);
  process.exit(1);
});
