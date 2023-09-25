import express from "express"
import controller from "./controller";
import protect from '../../middleware/authentication.middleware'
const router=express.Router();
router.get("/getByScheduleId/:id",controller.getBySchedule)
router.delete("/remove/:id",controller.removeCrew)
router.post("/pushToDevice/:id",controller.pushDateToDevice);
router.post("/logs",controller.getDeviceLogs);
router
.route('/')
.get(controller.getAll)
.post(controller.create)
router
  .route('/:id')
  .get(controller.getOne)
  .patch(controller.addCrew)
export default router