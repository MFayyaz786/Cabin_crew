import express from "express";
const router=express.Router()
import controller from "./controller"
router.get("/states",controller.getStates)
router.get("/staff/states",controller.getStaffStates)
router.get("/airLine/states/:id",controller.getAirLineStates)

export default router