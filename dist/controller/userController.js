"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = void 0;
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
const prismaClient_1 = __importDefault(require("../db/prismaClient"));
const apiResponse_1 = __importDefault(require("../util/apiResponse"));
const getUserProfile = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { username } = req.params;
    const profile = await prismaClient_1.default.user.findFirst({
        where: {
            username,
        },
        include: {
            posts: true,
            followers: true,
            friends: true,
        },
    });
    res.status(200).json(new apiResponse_1.default({
        ...profile,
        follower: profile?.followers.length,
        friends: profile?.friends.length,
    }, "Your Profile"));
});
exports.getUserProfile = getUserProfile;
