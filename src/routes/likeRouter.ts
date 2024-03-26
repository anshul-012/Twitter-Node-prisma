import { Router } from "express";
import auth from "../middlewares/AuthMiddlewares";
import { likeToggle, likedPostOfUser } from "../controller/likeController";

const router = Router();

router.route("/").get(auth, likedPostOfUser);
router.route("/:postId").post(auth,likeToggle);

export default router;