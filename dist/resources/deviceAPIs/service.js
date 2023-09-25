"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const deviceAPILog_1 = require("./../../entities/deviceAPILog");
const deviceLogsRepo = (0, typeorm_1.getRepository)(deviceAPILog_1.DeviceAPILog);
const axios_1 = __importDefault(require("axios"));
const logService_1 = __importDefault(require("./logService"));
const service = {
    pushRegisterCrew: async (CardNo, EmployeeNo, Name, Image) => {
        const body = {
            CardNo,
            EmployeeNo,
            Name,
            Image
        };
        console.log("body", body);
        let log;
        try {
            log = await logService_1.default.new("pushCrewDate", body);
        }
        catch (e) {
            console.log(e);
        }
        let url = `${process.env.DEVICEAPIURL}API/MobileApi/Registeration`;
        const options = {
            headers: { "ContentType": "Application/json" },
        };
        const response = await axios_1.default.post(url, body, options);
        try {
            await logService_1.default.updateResponse(log.id, response.data);
        }
        catch (e) {
        }
        return response.data;
    },
    registerThumbImpression: async (CardNo) => {
        const body = { CardNo };
        let log;
        try {
            log = await logService_1.default.new("registerThumbImpression", body);
        }
        catch (e) {
            console.log(e);
        }
        let url = `${process.env.DEVICEAPIURL}api/mobileapi/GetUserDetail`;
        const options = {
            headers: { "ContentType": "Application/json" },
        };
        const data = await axios_1.default.post(url, body, options);
        try {
            await logService_1.default.updateResponse(log.id, data.data);
        }
        catch (error) {
            console.log(error);
        }
        return data.data;
    },
    //   fetchLogs:async( StartDate:any,EndDate:any)=>{
    //   const body = {
    //     StartDate,
    //     EndDate,
    //   };
    //    let log;
    //   try {
    //     log =await logServices.new("fetchLogs", body);
    //   } catch (e) {
    //     console.log(e);
    //   }
    //  let url = `${process.env.DEVICEAPIURL}api/mobileapi/GetDeviceLog`;
    //   const options = {
    //     headers: { "ContentType":"Application/json" },
    //   };
    //   const data = await axios.post(url, JSON.stringify(body), options);
    //    try {
    //      await logServices.updateResponse(log.id, data.data);
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   console.log(data.data);
    //   return data.data;
    //   }
    pushDateToDevice: async (crews) => {
        let log;
        try {
            log = await logService_1.default.new("pushDateToDevice", crews);
        }
        catch (e) {
            console.log(e);
        }
        let url = `${process.env.DEVICEAPIURL}api/mobileapi/pushDataToDevice`;
        const options = {
            headers: { "ContentType": "Application/json" },
        };
        const data = await axios_1.default.post(url, crews, options);
        try {
            await logService_1.default.updateResponse(log.id, data.data);
        }
        catch (error) {
            console.log(error);
        }
        return data.data;
    },
    getLogs: async (StartDate, EndDate) => {
        const body = {
            StartDate,
            EndDate
        };
        let log;
        try {
            log = await logService_1.default.new("getDeviceLogs", body);
        }
        catch (e) {
            console.log(e);
        }
        let url = `${process.env.DEVICEAPIURL}api/mobileapi/GetDeviceLog`;
        const options = {
            headers: { "ContentType": "Application/json" },
        };
        const data = await axios_1.default.post(url, body, options);
        try {
            await logService_1.default.updateResponse(log.id, data.data);
        }
        catch (error) {
            console.log(error);
        }
        return data.data;
    },
    getAllLogs: async (startDate, toDate) => {
        const result = await deviceLogsRepo.query(`SELECT
  dl."LogNo",
  dl."LogTime",
  dl."MinorType",
  c."cardNo",
  c."employId",
  c."name",
  c."designation",
  c."onDuty"
FROM
  device_logs AS dl
JOIN
  crew AS c ON dl."CardNo" = c."cardNo"
WHERE
  Date(dl."createdDate") >= '${startDate}'::date
  AND Date(dl."createdDate") <= '${toDate}'::date;
`);
        return result;
    }
};
exports.default = service;
