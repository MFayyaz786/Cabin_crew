import { getRepository,FindManyOptions  } from 'typeorm';
import Crew from '../../entities/crew';
const crewRepo = getRepository(Crew);
import AirlineType from '../../entities/airlineType';
import uploadFile from '../../utils/uploadFile';
import fs from "fs";
import { promisify } from "util";
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
    const fileBuffer = Buffer.from(fileData, "base64");
    const fileName = Date.now() + "." + fileSubType;
    let filePath = null;
    let filePathPrefix = null;
    if (fileMainType === "image") {
      filePathPrefix = "images/";
      filePath = "../Airport_Cabin_Crew_Node/public/images/" + fileName;
      console.log(filePath);
    } else if (fileMainType === "video") {
      filePathPrefix = "videos/";
      filePath = "../../../public/videos/" + fileName;
    } else {
      filePathPrefix = "files/";
      filePath = "../../../public/files/" + fileName;
    }
    await writeFile(filePath, fileBuffer);
    crewData.image = filePathPrefix + fileName;
};
      const user = crewRepo.create(crewData);
      await crewRepo.save(user);
     return user;
  },
  getAll:async() =>{
 const result = await crewRepo.find({relations:["createdBy","airLine","updatedBy"]});
      return result;
  },
  getCrewsByAirLine:async(airLine:any) =>{
  const options: FindManyOptions<Crew> = {
    where: { airLine: { id: airLine } },
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
    const fileBuffer = Buffer.from(fileData, "base64");
    const fileName = Date.now() + "." + fileSubType;
    let filePath = null;
    let filePathPrefix = null;
    if (fileMainType === "image") {
      filePathPrefix = "images/";
      filePath = "../Airport_Cabin_Crew_Node/public/images/" + fileName;
      console.log(filePath);
    } else if (fileMainType === "video") {
      filePathPrefix = "videos/";
      filePath = "../../../public/videos/" + fileName;
    } else {
      filePathPrefix = "files/";
      filePath = "../../../public/files/" + fileName;
    }
    await writeFile(filePath, fileBuffer);
    crewData.image = filePathPrefix + fileName;
};
const result=await crewRepo.update({id},crewData);
return result;
},
delete:async(id:string)=>{
  const result=await crewRepo.delete({id});
  return result
}

}
export default service
