"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followToggle = void 0;
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
const prismaClient_1 = __importDefault(require("../db/prismaClient"));
const apiResponse_1 = __importDefault(require("../util/apiResponse"));
const ApiError_1 = __importDefault(require("../util/ApiError"));
const followToggle = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { userId } = req.params;
    const myId = req?.user?.id;
    try {
        let friends = await prismaClient_1.default.friend.findFirst({
            where: {
                userId: myId,
                followerId: userId
            }
        });
        if (friends) {
            await prismaClient_1.default.friend.delete({
                where: {
                    id: friends.id,
                },
            });
            return res
                .status(200)
                .json(new apiResponse_1.default({}, "You Unfollow a User"));
        }
        await prismaClient_1.default.friend.create({
            data: {
                followerId: userId,
                userId: myId,
            },
        });
        res.status(200).json(new apiResponse_1.default({}, "You Follow a user"));
    }
    catch (error) {
        next(new ApiError_1.default(400, "This is user is not exists "));
    }
});
exports.followToggle = followToggle;
