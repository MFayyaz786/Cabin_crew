import asyncHandler from "express-async-handler";
import { Request,Response ,NextFunction} from "express";
import service from "./service"
//* get All Logs
const getAllLogs = asyncHandler(async (req: Request, res: Response):Promise<any> => {
  const list= await service.getAllLogs(req.query.startDate,req.query.toDate);
  return res.status(200).send({msg:"List",data:list});
});
export default {getAllLogs}