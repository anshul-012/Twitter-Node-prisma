import { Router } from "express";
import { getUserProfile, updateUserAvatar } from "../controller/userController";
import auth from "../middlewares/AuthMiddlewares";
import upload from "../middlewares/multerMiddlewares";

const router = Router();

router.route("/:username").get(getUserProfile);
router.route("/avatar").patch(auth,upload.single("avatar"), updateUserAvatar);
export default router;