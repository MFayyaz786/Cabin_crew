"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scheduleFlightCrew_1 = __importDefault(require("../../entities/scheduleFlightCrew"));
const scheduleCrews_1 = __importDefault(require("../../entities/scheduleCrews"));
const typeorm_1 = require("typeorm");
const crew_1 = __importDefault(require("../../entities/crew"));
const crewRepo = (0, typeorm_1.getRepository)(crew_1.default);
const flightSchedule_1 = __importDefault(require("../../entities/flightSchedule"));
const flightScheduleRepo = (0, typeorm_1.getRepository)(flightSchedule_1.default);
const scheduleFlightCrewRepo = (0, typeorm_1.getRepository)(scheduleFlightCrew_1.default);
const scheduleCrewsRepo = (0, typeorm_1.getRepository)(scheduleCrews_1.default);
const service = {
    create: async (flight, scheduledFlight, crews, airLine, createdBy) => {
        let crewsList = [];
        for (let i = 0; i < crews.length; i++) {
            const newCrew = scheduleFlightCrewRepo.create({ flight, scheduledFlight, crew: crews[i], airLine, createdBy });
            await scheduleFlightCrewRepo.save(newCrew);
            crewsList.push(newCrew);
        }
        return crewsList;
    },
    getAll: async (query) => {
        const result = await scheduleFlightCrewRepo.find({ where: { deleted: false }, relations: ["crew", "airLine", "scheduledFlight"] });
        //.query(`SELECT * FROM schedule_flight_crew where "deleted" = false `);
        console.log(result);
        return result;
    },
    getBySchedule: async (scheduleFlightId) => {
        const result = await scheduleFlightCrewRepo.query(`SELECT sfc.id, sfc."crewId",c."name",c."gender",c."designation",c."cardNo" ,sfc."scheduledFlightId"
  FROM schedule_flight_crew sfc JOIN crew c ON sfc."crewId"= c.id WHERE sfc."scheduledFlightId"='${scheduleFlightId}' AND sfc."deleted"=false`);
        // JOIN schedule_flight_crew_crews_crew sfccc 
        // ON sfccc."scheduleFlightCrewId" = sfc.id JOIN crew c ON sfccc."crewId"= c.id WHERE sfc."scheduledFlightId"='${scheduleFlightId}'`);
        //find({where:{deleted:false},relations:["crews","airLine","scheduledFlight"]})
        //.query(`SELECT * FROM schedule_flight_crew where "deleted" = false `);
        console.log(result);
        return result;
    },
    getOne: async (id) => {
        const flight = await scheduleFlightCrewRepo.findOne({ where: { id: id, deleted: false }, relations: ["crew", "airLine", "scheduledFlight"] });
        return flight;
    },
    getFlightScheduleCrews: async (id) => {
        console.log("hello", id);
        const flight = await scheduleFlightCrewRepo.query(`SELECT sfc.id, sfc."crewId" FROM schedule_flight_crew sfc WHERE sfc."scheduledFlightId" = '${id} AND sfc."deleted"=false';
`);
        //JOIN schedule_flight_crew_crews_crew sfccc ON sfccc."scheduleFlightCrewId" = sfc.id
        //findOneBy({  scheduledFlightId:id ,
        // relations: ["crews", "airLine", "scheduleFlight"], // Updated relation name
        //});
        return flight;
    },
    getScheduleFlight: async (flightId) => {
        const flight = await scheduleFlightCrewRepo.query(`SELECT *
FROM flight_schedule
WHERE "flightId" ='${flightId}'
ORDER BY "createdDate" DESC
LIMIT 1;
`);
        return flight[0];
    },
    assignNewCrew: async (scheduleFlightData) => {
        const newCrew = scheduleFlightCrewRepo.create(scheduleFlightData);
        await scheduleFlightCrewRepo.save(newCrew);
        return newCrew;
    },
    removeCrew: async (scheduledFlight, crew) => {
        console.log(scheduledFlight, crew);
        const result = await scheduleFlightCrewRepo.
            query(`UPDATE schedule_flight_crew SET "deleted" = true where "scheduledFlightId" = '${scheduledFlight}' AND "crewId" = '${crew}'`);
        return result[1];
    },
    getAllVerifiedPushToDevice: async (flightScheduledId) => {
        //     const crews=await crewRepo.query(`select name as "Name","employId" as "EmpNo","cardNo" as "CardNo","image" as "ImageDate","thumbImpression" as "FPData" from crew 
        // where deleted=false AND "isVerified"=true
        // AND
        // "airLineId"='${airLine}'`)
        const crews = await scheduleFlightCrewRepo.query(` SELECT c."name" as "Name",c."employId" as "EmpNo",c."cardNo" as "CardNo",c."image" as "ImageDate",c."thumbImpression" as "FPData"
 FROM schedule_flight_crew
 AS sfc 
 JOIN crew AS c ON sfc."crewId" = c.id 
 WHERE c."isVerified" =true AND sfc."scheduledFlightId" = '${flightScheduledId}'`);
        return crews;
    },
};
exports.default = service;
