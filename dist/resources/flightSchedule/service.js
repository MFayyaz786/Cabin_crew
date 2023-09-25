"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const flightSchedule_1 = __importDefault(require("../../entities/flightSchedule"));
const flightScheduleRepo = (0, typeorm_1.getRepository)(flightSchedule_1.default);
const flightStatus_1 = __importDefault(require("../../entities/flightStatus"));
const service_1 = __importDefault(require("../flightStatus/service"));
const service_2 = __importDefault(require("../scheduleFlightCrew/service"));
const service_3 = __importDefault(require("../crew/service"));
const flightStatusRepo = (0, typeorm_1.getRepository)(flightStatus_1.default);
const service = {
    create: async (flightScheduleData) => {
        const status = await flightStatusRepo.findOne({ where: { status: "On-Time" } });
        flightScheduleData.flightStatus = status;
        const user = flightScheduleRepo.create(flightScheduleData);
        await flightScheduleRepo.save(user);
        return user;
    },
    getAll: async (query) => {
        const result = await flightScheduleRepo.find({ where: { deleted: false }, relations: ["airLine", "flightStatus", "flight"] });
        return result;
    },
    getOne: async (id) => {
        const flight = await flightScheduleRepo.findOne({ where: { id: id }, relations: ["flightStatus", "airLine"] });
        return flight;
    },
    recentScheduled: async () => {
        const currentDate = new Date().toLocaleDateString();
        const flights = await flightScheduleRepo.query(`SELECT fs.id, fs."scheduleDate" ,fs."departureDate",fs."arrivalDate",fs."scheduleType",
at.name as airLine,
f."flightNo",f."origin",f."destination",s."status"
FROM flight_schedule AS fs
LEFT JOIN airline_type AS at ON "airLineId" = at.id
LEFT JOIN flight AS f ON "flightId" = f.id
LEFT JOIN statuses AS s ON "flightStatusId" = s.id where Date("scheduleDate")='${currentDate}'::date`);
        return flights;
    },
    getScheduleFlight: async (flightId) => {
        const flight = await flightScheduleRepo.query(`SELECT *
FROM flight_schedule
WHERE "flightId" ='${flightId}'
ORDER BY "createdDate" DESC
LIMIT 1;
`);
        return flight[0];
    },
    update: async (id, flightScheduleData) => {
        const result = await flightScheduleRepo.update({ id }, flightScheduleData);
        return result;
    },
    updateFlightStatus: async (id, flightScheduleData) => {
        const result = await flightScheduleRepo.createQueryBuilder().update(flightScheduleData).where("id=:id", { id }).returning("*").execute();
        if (result.affected) {
            const status = await service_1.default.getOne(result.raw[0].flightStatusId);
            if (status.status === "Arrived" || status.status === "Departed") {
                const crews = await service_2.default.getFlightScheduleCrews(result.raw[0].id);
                await service_3.default.updateCrewDutyStatus1(crews, false);
                await flightScheduleRepo.update({ id }, { isLand: true, isSchedule: false });
            }
        }
        return result;
    },
    delete: async (id) => {
        const result = await flightScheduleRepo.update({ id }, { deleted: true });
        return result;
    }
};
exports.default = service;
