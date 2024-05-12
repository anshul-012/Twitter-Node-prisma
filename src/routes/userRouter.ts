import { Router } from "express";
import { changePassword, getUserProfile, searchUsers, updateUserAvatar } from "../controller/userController";
import auth from "../middlewares/AuthMiddlewares";
import upload from "../middlewares/multerMiddlewares";

const router = Router();

router.route("/search/:username").get( searchUsers);
router.route("/:username").get(getUserProfile);
router.route("/avatar").patch(auth, upload.single("avatar"), updateUserAvatar);
router.route("/change-password").post(auth,changePassword)
export default router;