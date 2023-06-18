import express from "express"
import controller from "./controller";
import protect from '../../middleware/authentication.middleware'
const router=express.Router();
router.get("/assigned",controller.getAllAssigned)
router
.route('/')
.get(controller.getAll)
.post(controller.create)
router
  .route('/:id')
  .get(controller.getOne)
  .patch(controller.update)
  .delete(controller.deleteBooth);




export default router