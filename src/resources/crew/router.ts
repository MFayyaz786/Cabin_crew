import express from "express"
import controller from "./controller";
import protect from '../../middleware/authentication.middleware'
const router=express.Router();
router.get("/verified/:airLine",controller.getAllVerified)
router
.route('/')
.get(controller.getAll)
.post(controller.create)
router.post("/registerThumb",controller.registerCrewThumb);
router.post("/verifyThumb",controller.verifyThumbImpression)
router.post("/pushCrewDetails",controller.pushCrewData)
router
  .route('/:id')
  .get(controller.getOne)
  .patch(controller.update)
  .delete(controller.deleteCrew);
router.get("/airLine/:airLine",controller.getCrewsByAirLine)  
export default router