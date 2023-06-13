import express from "express"
import controller from "./controller";
import protect from '../../middleware/authentication.middleware'
const router=express.Router();
router
.route('/')
.get(controller.getAll)
.post(controller.addNewDevice)
router
  .route('/:id')
  .get(controller.getOne)
  .patch(controller.update)
  .delete(controller.deleteDevice);



export default router