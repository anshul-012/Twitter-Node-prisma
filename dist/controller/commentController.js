"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = void 0;
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
            userId
        }
    });
    res.json(new apiResponse_1.default(comment, "Your comment is posted... "));
});
exports.addComment = addComment;
