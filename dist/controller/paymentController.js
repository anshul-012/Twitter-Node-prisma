"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blueTick = exports.buyPlan = void 0;
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
// import ApiError from "../util/ApiError";
const app_1 = require("../app");
const ApiError_1 = __importDefault(require("../util/ApiError"));
const prismaClient_1 = __importDefault(require("../db/prismaClient"));
const apiResponse_1 = __importDefault(require("../util/apiResponse"));
exports.buyPlan = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { payment } = req.body;
    const lineItem = [
        {
            price_data: {
                currency: "inr",
                product_data: {
                    name: payment.name,
                    images: [payment.image],
                },
                unit_amount: Number(payment.price) * 100,
            },
            quantity: 1,
        },
    ];
    const session = await app_1.stripeInstance.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItem,
        mode: "payment",
        success_url: "http://localhost:5173/me",
        cancel_url: "http://localhost:5173/setting",
        metadata: {
            userId: payment.userId,
        },
    });
    res.json({ id: session.id });
});
exports.blueTick = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { userId } = req.body;
    if (userId) {
        return next(new ApiError_1.default(400, "userID is required !"));
    }
    await prismaClient_1.default.user.update({
        where: {
            id: userId,
        },
        data: {
            blueTick: true,
        },
    });
    res.status(200).json(new apiResponse_1.default({}, "user is verified now"));
});
