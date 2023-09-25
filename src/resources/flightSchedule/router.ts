import express from "express"
import controller from "./controller";
import protect from '../../middleware/authentication.middleware'
const router=express.Router();
router.get("/scheduled",controller.recentScheduled)
router
.route('/')
.get(controller.getAll)
.post(controller.create)
router
  .route('/:id')
  .get(controller.getOne)
  .patch(controller.update)
  .delete(controller.deleteFlight);
router.patch("/updateStatus/:id",controller.updateStatus)
export default router