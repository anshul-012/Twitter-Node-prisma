import asyncHandler from "../util/asyncHandler.js";
import ApiError from "../util/ApiError.js";
import db from "../db/prismaClient.js";
import ApiResponse from "../util/apiResponse.js";
const addComment = asyncHandler(async (req, res, next) => {
    const { content } = req.body;
    let { postId } = req.params;
    let userId = req?.user?.id;
    postId = Number(postId);
    if (!content) {
        return next(new ApiError(400, "content is required for comment !"));
    }
    const comment = await db.comment.create({
        data: {
            content,
            postId,
            userId,
        },
    });
    res.status(200).json(new ApiResponse(comment, "Your comment is posted... "));
});
const deleteComment = asyncHandler(async (req, res, next) => {
    const { commentId } = req.params;
    try {
        await db.comment.delete({
            where: {
                id: Number(commentId),
            },
        });
        res.status(200).json(new ApiResponse({}, "Your comment is successfull deleted..."));
    }
    catch (error) {
        next(new ApiError(400, "Something went wrong while deleting comment"));
    }
});
const getCommentByPost = asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    let { page, limit } = req.query;
    page = Number(page ? page : 0);
    limit = Number(limit ? limit : 10);
    const skip = page * limit;
    const comments = await db.comment.findMany({
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
    res.status(200).json(new ApiResponse(comments, "All comments of this Post"));
});
export { addComment, deleteComment, getCommentByPost };
