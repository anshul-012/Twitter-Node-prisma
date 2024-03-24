import { Router } from "express";
import { signOut, signUp, signin } from "../controller/authController";
import auth from "../middlewares/AuthMiddlewares";

const router = Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signin);
router.route("/signout").post(auth ,signOut)


export default router;