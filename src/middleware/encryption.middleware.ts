import asyncHandler from "express-async-handler"
import { Request,Response } from "express";
import AppError from "../utils/appError";
import encryptionService from "../../src/utils/encryptionService";
const { decryptObject, encryptObject }=encryptionService
const encryptionMiddleware = asyncHandler((req:Request, res:Response, next:Function):Promise<any> => {
  // Decrypt request body if it exists
  if (req.body && req.body.cipher) {
    try {
      const decrypted = decryptObject(req.body.cipher);
      req.body = decrypted;
      console.log("req.body: ", req.body);
      
    } catch (err) {
      console.log(err);
     return next(new AppError("invalid request body",400))
     //res.status(400).json({ error: "Invalid request body" });
    }
  }

  // Encrypt response data
  if (res.json) {
    const originalJson = res.json;
    res.json = function (data) {
      const encrypted = encryptObject(data);
      return originalJson.call(this, encrypted);
    };
  }

  next();
});
export default encryptionMiddleware;
