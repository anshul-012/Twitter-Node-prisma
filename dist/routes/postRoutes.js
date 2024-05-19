import { Router } from "express";
import auth from "../middlewares/AuthMiddlewares.js";
import { addPost, deletePost, getAllPost, getPostById, } from "../controller/postController.js";
import upload from "../middlewares/multerMiddlewares.js";
const router = Router();
router.route("/").post(auth, upload.single("image"), addPost).get(getAllPost);
router.route("/:postId").delete(auth, deletePost).get(getPostById);
export default router;
