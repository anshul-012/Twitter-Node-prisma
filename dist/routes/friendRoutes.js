"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthMiddlewares_1 = __importDefault(require("../middlewares/AuthMiddlewares"));
const friendcontroller_1 = require("../controller/friendcontroller");
const router = (0, express_1.Router)();
router.route("/:userId").post(AuthMiddlewares_1.default, friendcontroller_1.followToggle);
exports.default = router;
