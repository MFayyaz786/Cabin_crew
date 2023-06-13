import Booth from '../../entities/booth';
import {getConnection,getRepository} from 'typeorm';
const boothRepo = getRepository(Booth);
const  service= {
  create:async(userData: Booth) =>{
      const user = boothRepo.create(userData);
      await boothRepo.save(user);
      return user;
  },
  getAll:async() =>{
      const result = await boothRepo.find();
      return result;
  },
 getOne:async(id: any)=> {
      const user = await boothRepo.findOneBy({id});
      return user;
  },
update:async(id:string,userData:Booth)=>{
const result=await boothRepo.update({id},userData);
  console.log("result is",result);
return result;
},
delete:async(id:string)=>{
  const result=await boothRepo.delete({id});
  return result
},


getAssignedAll:async()=> {
  // const booths=await boothRepo.findBy({isAssigned:true});
  // console.log(booths)
  const result = await boothRepo
    .createQueryBuilder('Booth')
    .where('booth.location = :location', { location: 'entrance' })
    .getMany();

  return result;
}
}
export default service
