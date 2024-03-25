"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthMiddlewares_1 = __importDefault(require("../middlewares/AuthMiddlewares"));
const postController_1 = require("../controller/postController");
const multerMiddlewares_1 = __importDefault(require("../middlewares/multerMiddlewares"));
const router = (0, express_1.Router)();
router.route("/")
    .post(AuthMiddlewares_1.default, multerMiddlewares_1.default.single("image"), postController_1.addPost)
    .get(postController_1.getAllPost);
router.route("/:postId")
    .delete(AuthMiddlewares_1.default, postController_1.deletePost)
    .get(postController_1.getPostById);
exports.default = router;
