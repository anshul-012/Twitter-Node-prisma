import { NextFunction, Request, Response } from "express";
import asyncHandler from "../util/asyncHandler";
import ApiError from "../util/ApiError";
import db from "../db/prismaClient";
import ApiResponse from "../util/apiResponse";

const addComment = asyncHandler(
	async (
		req: Request<{ postId: number }, {}, { content: string }>,
		res: Response,
		next: NextFunction
	) => {
		const { content } = req.body;
		let { postId } = req.params;
        let userId = req?.user?.id;

        postId = Number(postId);
        

        if(!content) {
            return next(new ApiError(400,"content is required for comment !"))
        }

        const comment = await db.comment.create({
            data:{
                content,
                postId,
                userId
            }
        })

        res.json(new ApiResponse(comment,"Your comment is posted... "))
	}
);




export { addComment }