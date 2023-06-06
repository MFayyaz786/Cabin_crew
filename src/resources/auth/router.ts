import express from "express"
const router=express.Router();
import controller from "./controller";
router.get("/all",controller.getAll);
router.get("/details",controller.getOne)
router.post("/requestOtp",controller.sendOtp)
router.post("/verifyOtp",controller.verifyOtp)
router.post("/resetPassword",controller.resetPassword)
router.post("/forgotPassword",controller.forgotPassword)
router.post("/signIn",controller.login);
router.post("/refreshToken",controller.refreshToken);
router.post("/signup",controller.create);
router.route("/")
.patch(controller.update)
.delete(controller.deleteUser)
export default router