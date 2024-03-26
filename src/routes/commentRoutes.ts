import { Router } from "express";
import auth from "../middlewares/AuthMiddlewares";
import { addComment } from "../controller/commentController";

const router = Router();

router.route("/:postId").post(auth,addComment)


export default router;