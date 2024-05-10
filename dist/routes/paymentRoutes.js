"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controller/paymentController");
const AuthMiddlewares_1 = __importDefault(require("../middlewares/AuthMiddlewares"));
const router = (0, express_1.Router)();
router.route("/").post(AuthMiddlewares_1.default, paymentController_1.buyPlan);
router.route("/bluetick/:userId").patch(AuthMiddlewares_1.default, paymentController_1.blueTick);
exports.default = router;
