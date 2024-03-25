import { NextFunction, Request, Response } from "express";
import asyncHandler from "../util/asyncHandler";
import ApiError from "../util/ApiError";
import { deleteOnCloudinary, uploadOnCloudinary } from "../util/cloudinary";
import db from "../db/prismaClient";
import ApiResponse from "../util/apiResponse";

const addPost = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const ownerId = req?.user?.id as string;
		const { content }: { content: string } = req.body;

		if (!content) {
			return next(new ApiError(400, "Content is required"));
		}

		const imagePath = req.file?.path;

		if (imagePath) {
			const uploadedImage = await uploadOnCloudinary(imagePath);

			const image = {
				url: uploadedImage?.url,
				public_id: uploadedImage?.public_id,
			};

			const post = await db.post.create({
				data: {
					content,
					image,
					ownerId,
				},
			});

			return res.json(
				new ApiResponse(post, "Post successfull Uploaded.")
			);
		}

		const post = await db.post.create({
			data: {
				content,
				ownerId,
			},
		});

		return res.json(new ApiResponse(post, "Post successfull Uploaded."));
	}
);
const deletePost = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { postId } = req.params;

		if (!postId) {
			return next(new ApiError(400, "Post is required !"));
		}

		try {
			const postIdNum = Number(postId);

			const post = await db.post.delete({
				where: {
					id: postIdNum,
				},
			});

			const public_id = post?.image?.public_id as string;

			if (post.image !== null) {
				await deleteOnCloudinary(public_id);
			}

			res.json(
				new ApiResponse({}, "Your Post is successfully Deleted.")
			);
		} catch (error) {
			next(new ApiError(500, "SomeThing went wrong while deleting Post"));
		}
	}
);

export { addPost, deletePost };
