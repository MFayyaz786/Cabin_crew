import express from "express"
import controller from "./controller";
const router=express.Router();

router
.route('/')
.get(controller.getAll)
.post(controller.create)

router
  .route('/:id')
  .get(controller.getOne)
  .patch(controller.update)
  .delete(controller.deleteUser);



export default router