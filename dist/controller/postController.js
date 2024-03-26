"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPost = exports.getPostById = exports.deletePost = exports.addPost = void 0;
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
const ApiError_1 = __importDefault(require("../util/ApiError"));
const cloudinary_1 = require("../util/cloudinary");
const prismaClient_1 = __importDefault(require("../db/prismaClient"));
const apiResponse_1 = __importDefault(require("../util/apiResponse"));
const addPost = (0, asyncHandler_1.default)(async (req, res, next) => {
    const ownerId = req?.user?.id;
    const { content } = req.body;
    if (!content) {
        return next(new ApiError_1.default(400, "Content is required"));
    }
    const imagePath = req.file?.path;
    if (imagePath) {
        const uploadedImage = await (0, cloudinary_1.uploadOnCloudinary)(imagePath);
        const image = {
            url: uploadedImage?.url,
            public_id: uploadedImage?.public_id,
        };
        const post = await prismaClient_1.default.post.create({
            data: {
                content,
                image,
                ownerId,
            },
        });
        return res.json(new apiResponse_1.default(post, "Post successfull Uploaded."));
    }
    const post = await prismaClient_1.default.post.create({
        data: {
            content,
            ownerId,
        },
    });
    return res.json(new apiResponse_1.default(post, "Post successfull Uploaded."));
});
exports.addPost = addPost;
const deletePost = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { postId } = req.params;
    if (!postId) {
        return next(new ApiError_1.default(400, "Post is required !"));
    }
    try {
        const postIdNum = Number(postId);
        const post = await prismaClient_1.default.post.delete({
            where: {
                id: postIdNum,
            },
        });
        const public_id = post?.image;
        if (post.image !== null) {
            await (0, cloudinary_1.deleteOnCloudinary)(public_id.public_id);
        }
        res.json(new apiResponse_1.default({}, "Your Post is successfully Deleted."));
    }
    catch (error) {
        next(new ApiError_1.default(500, "SomeThing went wrong while deleting Post"));
    }
});
exports.deletePost = deletePost;
const getPostById = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { postId } = req.params;
    if (!postId) {
        return next(new ApiError_1.default(400, "Post is required !"));
    }
    const postIdNum = Number(postId);
    const post = await prismaClient_1.default.post.findFirst({
        where: {
            id: postIdNum,
        },
        include: {
            owner: {
                select: {
                    username: true,
                    avatar: true,
                },
            },
        },
    });
    res.json(new apiResponse_1.default(post, "single Post"));
});
exports.getPostById = getPostById;
const getAllPost = (0, asyncHandler_1.default)(async (req, res, next) => {
    const post = await prismaClient_1.default.post.findMany({
        include: {
            owner: {
                select: {
                    username: true,
                    avatar: true,
                },
            },
        },
    });
    res.json(new apiResponse_1.default(post, "single Post"));
});
exports.getAllPost = getAllPost;
