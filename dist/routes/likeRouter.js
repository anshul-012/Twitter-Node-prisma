import { Router } from "express";
import auth from "../middlewares/AuthMiddlewares.js";
import { likeToggle, likedPostOfUser } from "../controller/likeController.js";
const router = Router();
router.route("/").get(auth, likedPostOfUser);
router.route("/:postId").post(auth, likeToggle);
export default router;
