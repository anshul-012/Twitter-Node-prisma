"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
const prismaClient_1 = __importDefault(require("../db/prismaClient"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = __importDefault(require("../util/ApiError"));
const auth = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { accessToken } = req?.cookies;
    console.log(accessToken, req);
    if (!accessToken) {
        return next(new ApiError_1.default(401, "unauthorized user !!!"));
    }
    const decodedToken = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET);
    const user = await prismaClient_1.default.user.findUnique({
        where: { id: decodedToken?.id },
    });
    if (!user) {
        return next(new ApiError_1.default(401, "Invail access Token"));
    }
    req.user = user;
    next();
});
exports.default = auth;
