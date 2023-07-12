import { getRepository,FindManyOptions, Not, IsNull  } from 'typeorm';
import Crew from '../../entities/crew';
const crewRepo = getRepository(Crew);
import AirlineType from '../../entities/airlineType';
import uploadFile from '../../utils/uploadFile';
import fs from "fs";
import { promisify } from "util";
import deviceAPIService from "../deviceAPIs/service"
const writeFile = promisify(fs.writeFile);
const  service= {
  create:async(crewData:Crew) =>{
    if (crewData.image) {
       const match = crewData.image.match(/^data:(.+);base64,(.+)$/);
    if (!match) {
      throw new Error("Invalid file format");
    }
    const [, fileType, fileData] = match
    const [fileMainType, fileSubType] = fileType.split("/");
     if (fileMainType !== 'image' || fileSubType !== 'jpeg') {
        throw new Error('Only JPEG images are allowed');
      }
    crewData.image =fileData
};
      const user = crewRepo.create(crewData);
      await crewRepo.save(user);
      //  if(user){
      //   await deviceAPIService.pushRegisterCrew(user.cardNo,user.employId,user.name,user.image)
      // }
      return user;
  },
  getAll:async() =>{
 const result = await crewRepo.find({where:{deleted:false},relations:["createdBy","airLine","updatedBy"]});
      return result;
  },
  getAllVerified:async(airLine:any) =>{
    const crews=await crewRepo.query(`select id,name,designation,gender,phone,"employId","uniqueId","cardNo" from crew 
where deleted=false AND "isVerified"=true
AND
"airLineId"='${airLine}'`)
 const result = await crewRepo.find({where:{deleted:false,isVerified:true},relations:["createdBy","airLine","updatedBy"]});
      return crews;
  },
  getCrewsByAirLine:async(airLine:any) =>{
  const options: FindManyOptions<Crew> = {
    where: { airLine: { id: airLine },deleted:false },
    relations: ["createdBy", "airLine", "updatedBy"]
  };
  const result = await crewRepo.find(options);
//   return result;
//   const result = await crewRepo.find({where:{airLine:airLine  as AirlineType},relations:["createdBy","airLine","updatedBy"]});
      return result;
  },
 getOne:async(id: any)=> {
      const user = await crewRepo.findOne({where:{id:id},relations:["createdBy","airLine","updatedBy"]});
      return user;
  },
isRegistered:async(employId:any,cardNo:any)=>{
const result=await crewRepo.findOne({where:{employId:employId,cardNo:cardNo,
  isVerified:true,
  //thumbImpression:Not(IsNull())
}});
console.log(result);
return result;
  },
  verifyThumbImpression:async(thumbImpression:any)=>{
  const result=await crewRepo.findOne({where:{thumbImpression:thumbImpression}});
  return result;
  },
updateDeliveredStatus:async(id:string)=>{
const result=await crewRepo.update({id},{isDeliveredToDevice:true});
return result
},
update:async(id:string,crewData:Crew)=>{
   if (crewData.image) {
        const match = crewData.image.match(/^data:(.+);base64,(.+)$/);
    if (!match) {
      throw new Error("Invalid file format");
    }
    const [, fileType, fileData] = match
    const [fileMainType, fileSubType] = fileType.split("/");
     if (fileMainType !== 'image' || fileSubType !== 'jpeg') {
        throw new Error('Only JPEG images are allowed');
      }
    crewData.image =fileData
};
const result=await crewRepo.update({id},crewData);
return result;
},
registerThumb:async(cardNo:number,thumbImpression:any)=>{
  const result=await crewRepo.query(`UPDATE crew
SET "thumbImpression" = '${thumbImpression}',
    "isVerified" = true
WHERE "cardNo" = '${cardNo}'
`)
  //update({cardNo},{thumbImpression:thumbImpression,isVerified:true});
  console.log("result",result[1])
return result[1];
},
updateCrewDutyStatus:async(ids:any,onDuty:any)=>{
  console.log(ids)
 const results = [];
  for (const id of ids) {
    const result = await crewRepo.update({ id:id.id }, { onDuty });
    results.push(result);
  }
  return results;
},
updateCrewDutyStatus1:async(ids:any,onDuty:any)=>{
 const results = [];
  for (const id of ids) {
    const result = await crewRepo.update({ id:id.crewId }, { onDuty });
    results.push(result);
  }
  return results;
},
delete:async(id:string)=>{
  const result=await crewRepo.update({id},{deleted:true});
  return result
}

}
export default service
