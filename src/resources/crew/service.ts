import { getRepository,FindManyOptions  } from 'typeorm';
import Crew from '../../entities/crew';
const crewRepo = getRepository(Crew);
import AirlineType from '../../entities/airlineType';

const  service= {
  create:async(userDate:Crew) =>{
      const user = crewRepo.create(userDate);
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
update:async(id:string,userData:Crew)=>{
    console.log("result is",userData);
const result=await crewRepo.update({id},userData);
return result;
},
delete:async(id:string)=>{
  const result=await crewRepo.delete({id});
  return result
}

}
export default service
