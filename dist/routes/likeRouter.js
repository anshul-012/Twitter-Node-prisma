"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthMiddlewares_1 = __importDefault(require("../middlewares/AuthMiddlewares"));
const likeController_1 = require("../controller/likeController");
const router = (0, express_1.Router)();
router.route("/").get(AuthMiddlewares_1.default, likeController_1.likedPostOfUser);
router.route("/:postId").post(AuthMiddlewares_1.default, likeController_1.likeToggle);
exports.default = router;
