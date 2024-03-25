import { Router } from "express";
import auth from "../middlewares/AuthMiddlewares";
import { addPost, deletePost } from "../controller/postController";
import upload from "../middlewares/multerMiddlewares";

const router = Router();

router.route("/").post(auth,upload.single("image"),addPost)
router.route("/:postId").delete(auth,deletePost)

export default router;