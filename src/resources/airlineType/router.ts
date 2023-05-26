import express from 'express';
import controller from './controller';
const router=express.Router();
router.route("/")
.post(controller.addNew)
.get(controller.getAll)
.patch(controller.updateAirLine)
router.get("/details",controller.getOne);
export default router;