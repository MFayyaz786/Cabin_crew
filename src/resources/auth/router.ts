import express from "express"
import controller from "./controller";
const router=express.Router();


router.post('/signup',controller.signUp)
router.post('/signin',controller.signIn)
router.post('/refreshtoken',controller.refreshToken);
router.patch('/updatepassword',controller.updatePassword)
router.patch('/forgotpassword',controller.forgotPassword)
router.patch('/resetpassword',controller.resetPassword)

router.post('/verifyotp',controller.verifyOTP)

router.post('/generateotp',controller.generateOTP)






export default router