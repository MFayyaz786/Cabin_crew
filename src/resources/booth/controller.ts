import { Request,Response ,NextFunction} from "express";
import asyncHandler from "express-async-handler"
import service from "./service"
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/appError";
import validator from "./validator";
const {addNew,updateBooth}=validator
//* createUser
const create = catchAsync(async (req:Request, res:Response, next:NextFunction):Promise<any> => {
  const { error } = addNew.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message,400));
  }
  const booth = await service.create(req.body);
  if(booth){
    return res.status(201).send({msg:"Booth Created",data:booth})
  }else{
        return res.status(400).send({msg:"Failed!"})

  }
});
//* getAll
const getAll = catchAsync(async (req: Request, res: Response):Promise<any> => {
  const booths= await service.getAll();
  return res.status(200).send({msg:"Booths",data:booths});
});

//* getAll
const getAllAssigned = catchAsync(async (req: Request, res: Response):Promise<any> => {
  const booths= await service.getAssignedAll();
  return res.status(200).send({msg:"Booths",data:booths});
});
  //* getOne
  const getOne =catchAsync(async (req: Request, res: Response):Promise<any> => {
    const booth = await service.getOne(req.params.id);
    if(booth){
        return res.status(200).send({msg:"Booth",data:booth});
    }else{
        return res.status(404).send({msg:"Not Found!"});
    }
  });


//* update
const update = asyncHandler(async (req:Request, res:Response, next:Function):Promise<any> => {
  const { error } = updateBooth.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message,400));
  }
    const result = await service.update(String(req.params.id),req.body);
    if (result.affected) {
       return  res.status(200).send({ msg: "Booth Updated" })
    } else {
      return  res.status(400).send({ msg: "Failed!" })
    }
});
const deleteBooth=asyncHandler(async(req:Request,res:Response,next:Function):Promise<any>=>{
//const isAssigned=await 
  const result =await service.delete(String(req.params.id));
  // if(result.affected===0){
  //  return res.status(404).send({msg:"Not Found!"})
  // }
  if(result.affected){
   return res.status(200).send({
      msg:"deleted"
    })
  }else{
 return res.status(400).send({msg:"failed"})
  }
});
export default {create,getAll,getOne,update,deleteBooth,getAllAssigned}