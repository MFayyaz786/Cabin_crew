import express from "express";
const router=express.Router();
import controller from "./controller";
router.get("/",controller.getAllLogs)
export default router