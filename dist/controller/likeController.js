"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likedPostOfUser = exports.likeToggle = void 0;
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
const prismaClient_1 = __importDefault(require("../db/prismaClient"));
const apiResponse_1 = __importDefault(require("../util/apiResponse"));
const ApiError_1 = __importDefault(require("../util/ApiError"));
const likeToggle = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { postId } = req.params;
    const userId = req?.user?.id;
    try {
        let like = await prismaClient_1.default.like.findFirst({
            where: {
                postId: Number(postId),
                userId
            },
        });
        if (like) {
            await prismaClient_1.default.like.delete({
                where: {
                    id: like.id,
                },
            });
            return res
                .status(200)
                .json(new apiResponse_1.default({}, "You Unlike a post"));
        }
        await prismaClient_1.default.like.create({
            data: {
                postId: Number(postId),
                userId,
            },
        });
        res.status(200).json(new apiResponse_1.default({}, "You like a post"));
    }
    catch (error) {
        next(new ApiError_1.default(400, "This is post is not exists "));
    }
});
exports.likeToggle = likeToggle;
const likedPostOfUser = (0, asyncHandler_1.default)(async (req, res, next) => {
    const userId = req?.user?.id;
    const posts = await prismaClient_1.default.like.findMany({
        where: {
            userId
        },
        include: {
            post: true,
            user: {
                select: {
                    username: true,
                    avatar: true,
                }
            }
        }
    });
    res.status(200).json(new apiResponse_1.default(posts, "All your Liked Post"));
});
exports.likedPostOfUser = likedPostOfUser;
