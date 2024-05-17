import { Router } from "express";
import { forgetPassword, resetPassword, signOut, signUp, signin, verifyOtp } from "../controller/authController.js";
import auth from "../middlewares/AuthMiddlewares.js";

const router = Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signin);
router.route("/signout").post(auth ,signOut)
router.route("/forgot-password").post(auth,forgetPassword)
router.route("/verify-otp").post(auth,verifyOtp)
router.route("/reset-password").patch(auth,resetPassword)
export default router;