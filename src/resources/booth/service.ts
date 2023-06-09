import Booth from '../../entities/booth';
import {getConnection,getRepository} from 'typeorm';
const userRepo = getRepository(Booth);
const  service= {
  create:async(userData: Booth) =>{
      const user = userRepo.create(userData);
      await userRepo.save(user);
      return user;
  },
  getAll:async(query:any) =>{
      const result = await userRepo.find({where:query});
      return result;
  },
 getOne:async(id: any)=> {
      const user = await userRepo.findOneBy({id});
      return user;
  },
update:async(id:string,userData:Booth)=>{
const result=await userRepo.update({id},userData);
  console.log("result is",result);
return result;
},
delete:async(id:string)=>{
  const result=await userRepo.delete({id});
  return result
}

}
export default service
