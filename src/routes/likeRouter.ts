import { Router } from "express";
import auth from "../middlewares/AuthMiddlewares";
import { likeToggle } from "../controller/likeController";

const router = Router();

router.route("/:postId").post(auth,likeToggle);

export default router;