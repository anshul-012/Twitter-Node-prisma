import { Router } from "express";
import { getUserProfile } from "../controller/userController";

const router = Router();

router.route("/:username").get(getUserProfile)
export default router;