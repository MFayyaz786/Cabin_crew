import { getRepository } from 'typeorm';
import { DeviceAPILog } from './../../entities/deviceAPILog';
const deviceLogsRepo=getRepository(DeviceAPILog)
import axios from "axios";
import logServices from "./logService"
import errorHandlerMiddleware from "../../middleware/errorHandler.middleware";
const service={
    pushRegisterCrew:async( CardNo:any,EmployeeNo:any,Name:any,Image:any)=>{
    const body = {
    CardNo,
    EmployeeNo,
    Name,
    Image
    };
    console.log("body",body)
    let log;
    try {
      log =await logServices.new("pushCrewDate", body);
    } catch (e) {
      console.log(e);
    }
   let url = `${process.env.DEVICEAPIURL}API/MobileApi/Registeration`;
    const options = {
      headers: { "ContentType":"Application/json" },
    };
    const response = await axios.post(url, body, options);
     try {
       await logServices.updateResponse(log.id, response.data);
      } catch (e) {
      }
    return response.data;
    },
    registerThumbImpression:async( CardNo:any)=>{
    const body = {CardNo};
    let log;
    try {
      log =await logServices.new("registerThumbImpression", body);
    } catch (e) {
      console.log(e);
    }
   let url = `${process.env.DEVICEAPIURL}api/mobileapi/GetUserDetail`;
    const options = {
      headers: { "ContentType":"Application/json" },
    };
    const data = await axios.post(url, body, options);
    try{
      await logServices.updateResponse(log.id, data.data);
    }catch(error){
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

pushDateToDevice:async( crews:any)=>{
    let log;
    try {
      log =await logServices.new("pushDateToDevice", crews);
    } catch (e) {
      console.log(e);
    }
   let url = `${process.env.DEVICEAPIURL}api/mobileapi/pushDataToDevice`;
    const options = {
      headers: { "ContentType":"Application/json" },
    };
    const data = await axios.post(url, crews, options);
    try{
      await logServices.updateResponse(log.id, data.data);
    }catch(error){
      console.log(error);
    }
    return data.data;
    },
 getLogs:async( StartDate:any,EndDate:any)=>{
  const body={
    StartDate,
    EndDate
  }
    let log;
    try {
      log =await logServices.new("getDeviceLogs", body);
    } catch (e) {
      console.log(e);
    }
   let url = `${process.env.DEVICEAPIURL}api/mobileapi/GetDeviceLog`;
    const options = {
      headers: { "ContentType":"Application/json" },
    };
    const data = await axios.post(url, body, options);
    try{
      await logServices.updateResponse(log.id, data.data);
    }catch(error){
      console.log(error);
    }
    return data.data;
    },
    getAllLogs:async(startDate:any,toDate:any)=>{
      const result=await deviceLogsRepo.query(`SELECT
  dl."LogNo",
  dl."LogTime",
  dl."MinorType",
  c."cardNo",
  c."employId",
  c."name",
  c."designation"
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
}
export default service