import { Router } from "express";
import auth from "../middlewares/AuthMiddlewares";
import { addComment, deleteComment, getCommentByPost } from "../controller/commentController";

const router = Router();

router.route("/:postId").get(getCommentByPost)
router.use(auth);
router.route("/:postId").post(addComment);
router.route("/:commentId").delete(deleteComment);

export default router;
