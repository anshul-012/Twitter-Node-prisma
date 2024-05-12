"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const AuthMiddlewares_1 = __importDefault(require("../middlewares/AuthMiddlewares"));
const multerMiddlewares_1 = __importDefault(require("../middlewares/multerMiddlewares"));
const router = (0, express_1.Router)();
router.route("/search/:username").get(userController_1.searchUsers);
router.route("/:username").get(userController_1.getUserProfile);
router.route("/avatar").patch(AuthMiddlewares_1.default, multerMiddlewares_1.default.single("avatar"), userController_1.updateUserAvatar);
exports.default = router;
