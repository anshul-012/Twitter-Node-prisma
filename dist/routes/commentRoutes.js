"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthMiddlewares_1 = __importDefault(require("../middlewares/AuthMiddlewares"));
const commentController_1 = require("../controller/commentController");
const router = (0, express_1.Router)();
router.route("/:postId").get(commentController_1.getCommentByPost);
router.use(AuthMiddlewares_1.default);
router.route("/:postId").post(commentController_1.addComment);
router.route("/:commentId").delete(commentController_1.deleteComment);
exports.default = router;
