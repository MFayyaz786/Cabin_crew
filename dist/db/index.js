"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const colors_1 = __importDefault(require("colors"));
const user_1 = __importDefault(require("../entities/user"));
const airlineType_1 = __importDefault(require("../entities/airlineType"));
const flight_1 = __importDefault(require("../entities/flight"));
const booth_1 = __importDefault(require("../entities/booth"));
const device_1 = __importDefault(require("../entities/device"));
const auth_1 = __importDefault(require("../entities/auth"));
const crew_1 = __importDefault(require("../entities/crew"));
const flightSchedule_1 = __importDefault(require("../entities/flightSchedule"));
const scheduleFlightCrew_1 = __importDefault(require("../entities/scheduleFlightCrew"));
const flightStatus_1 = __importDefault(require("../entities/flightStatus"));
const deviceAPILog_1 = __importDefault(require("../entities/deviceAPILog"));
const notification_1 = __importDefault(require("../entities/notification"));
const deviceLogs_1 = __importDefault(require("../entities/deviceLogs"));
const mainMenuModel_1 = __importDefault(require("../entities/mainMenuModel"));
const userSessionMode_1 = require("../entities/userSessionMode");
const levelOneMenuModel_1 = require("../entities/levelOneMenuModel");
exports.default = (0, typeorm_1.createConnection)({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [user_1.default, airlineType_1.default, booth_1.default, device_1.default, crew_1.default, flight_1.default, flightSchedule_1.default, scheduleFlightCrew_1.default, auth_1.default, flightStatus_1.default, deviceAPILog_1.default, notification_1.default, deviceLogs_1.default, mainMenuModel_1.default, levelOneMenuModel_1.LevelOneMenuEntity, userSessionMode_1.UserSessionEntity],
    migrations: [],
    synchronize: true,
    logging: false,
}).then(connection => {
    console.log(colors_1.default.yellow.bold('Connected to the database :) '));
    console.log(colors_1.default.yellow.bold(`--------------------------------------------------------`));
}).catch(error => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
});
