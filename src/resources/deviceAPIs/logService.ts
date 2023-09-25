import  DeviceAPILog  from '../../entities/deviceAPILog';
import { getRepository,FindManyOptions, Not, IsNull  } from 'typeorm';
const deviceApiLogRepo = getRepository(DeviceAPILog);
const deviceApiLogService = {
  new: async (path:any ,request:any) => {
    const logs = deviceApiLogRepo.create({path,request});
    await deviceApiLogRepo.save(logs);
    return logs;
  },
  updateResponse: async (id:any, response:any) => {
    const result = await deviceApiLogRepo.update({ id },{ response },);
    return result;
  },
};
export default deviceApiLogService;
