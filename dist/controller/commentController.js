"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentByPost = exports.deleteComment = exports.addComment = void 0;
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
const ApiError_1 = __importDefault(require("../util/ApiError"));
const prismaClient_1 = __importDefault(require("../db/prismaClient"));
const apiResponse_1 = __importDefault(require("../util/apiResponse"));
const addComment = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { content } = req.body;
    let { postId } = req.params;
    let userId = req?.user?.id;
    postId = Number(postId);
    if (!content) {
        return next(new ApiError_1.default(400, "content is required for comment !"));
    }
    const comment = await prismaClient_1.default.comment.create({
        data: {
            content,
            postId,
            userId,
        },
    });
    res.status(200).json(new apiResponse_1.default(comment, "Your comment is posted... "));
});
exports.addComment = addComment;
const deleteComment = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { commentId } = req.params;
    try {
        await prismaClient_1.default.comment.delete({
            where: {
                id: Number(commentId),
            },
        });
        res.status(200).json(new apiResponse_1.default({}, "Your comment is successfull deleted..."));
    }
    catch (error) {
        next(new ApiError_1.default(400, "Something went wrong while deleting comment"));
    }
});
exports.deleteComment = deleteComment;
const getCommentByPost = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { postId } = req.params;
    let { page, limit } = req.query;
    page = Number(page ? page : 0);
    limit = Number(limit ? limit : 10);
    const skip = page * limit;
    const comments = await prismaClient_1.default.comment.findMany({
        skip: skip,
        take: limit,
        where: {
            postId: Number(postId),
        },
        include: {
            user: {
                select: {
                    username: true,
                    avatar: true,
                },
            },
        },
    });
    res.status(200).json(new apiResponse_1.default(comments, "All comments of this Post"));
});
exports.getCommentByPost = getCommentByPost;
