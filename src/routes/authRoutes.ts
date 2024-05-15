import { Router } from "express";
import { forgetPassword, signOut, signUp, signin, verifyOtp } from "../controller/authController";
import auth from "../middlewares/AuthMiddlewares";

const router = Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signin);
router.route("/signout").post(auth ,signOut)
router.route("/forget-password").post(auth,forgetPassword)
router.route("/verify-otp").post(auth,verifyOtp)

export default router;