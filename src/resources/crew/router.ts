import express from "express"
import controller from "./controller";
import protect from '../../middleware/authentication.middleware'
const router=express.Router();
router
.route('/')
.get(controller.getAll)
.post(controller.create)
router.post("/registerThumb",controller.registerCrewThumb)
router
  .route('/:id')
  .get(controller.getOne)
  .patch(controller.update)
  .delete(controller.deleteCrew);
router.get("/airLine/:airLine",controller.getCrewsByAirLine)  
export default router