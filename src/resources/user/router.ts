import express from "express"
import controller from "./controller";
import protect from '../../middleware/authentication.middleware'

const router=express.Router();

router
.route('/')
.get(controller.getAll)
.post(protect,controller.create)

router
  .route('/:id')
  .get(controller.getOne)
  .patch(protect,controller.update)
  .delete(protect,controller.deleteUser);



export default router