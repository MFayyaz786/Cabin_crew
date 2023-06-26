import axios from "axios";
import logServices from "./logService"
const service={
    pushRegisterCrew:async( CardNo:any,EmployeeNo:any,Name:any,Image:any)=>{
    const body = {
      CardNo,
      EmployeeNo,
      Name,
      Image,
    };
    let log;
    try {
      log =await logServices.new("pushCrewDate", body);
    } catch (e) {
      console.log(e);
    }
    console.log(log)
   let url = `${process.env.DEVICEAPIURL}API/MobileApi/Registeration`;
    const options = {
      headers: { "ContentType":"Application/json" },
    };
    const data = await axios.post(url, JSON.stringify(body), options);
     try {
       await logServices.updateResponse(log.id, data.data);
      } catch (e) {
        console.log(e);
      }
      console.log("data",data.data);
      
    return data.data;
    },
    fetchLogs:async( StartDate:any,EndDate:any)=>{
    const body = {
      StartDate,
      EndDate,
    };
     let log;
    try {
      log =await logServices.new("fetchLogs", body);
    } catch (e) {
      console.log(e);
    }
   let url = `${process.env.DEVICEAPIURL}api/mobileapi/GetDeviceLog`;
    const options = {
      headers: { "ContentType":"Application/json" },
    };
    const data = await axios.post(url, JSON.stringify(body), options);
     try {
       await logServices.updateResponse(log.id, data.data);
      } catch (e) {
        console.log(e);
      }
    console.log(data.data);
    return data.data;
    }


}
export default service