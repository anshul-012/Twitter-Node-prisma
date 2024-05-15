"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const AuthMiddlewares_1 = __importDefault(require("../middlewares/AuthMiddlewares"));
const router = (0, express_1.Router)();
router.route("/signup").post(authController_1.signUp);
router.route("/signin").post(authController_1.signin);
router.route("/signout").post(AuthMiddlewares_1.default, authController_1.signOut);
router.route("/forget-password").post(AuthMiddlewares_1.default, authController_1.forgetPassword);
router.route("/verify-otp").post(AuthMiddlewares_1.default, authController_1.verifyOtp);
exports.default = router;
