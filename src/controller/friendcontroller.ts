import { NextFunction, Request, Response } from "express";
import asyncHandler from "../util/asyncHandler.js";
import db from "../db/prismaClient.js";
import ApiResponse from "../util/apiResponse.js";
import ApiError from "../util/ApiError.js";

const followToggle = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { userId } = req.params;
		const myId = req?.user?.id;

		try {
			let friends = await db.friend.findFirst({
                where:{
                    userId:myId,
                    followerId:userId
                }
            })

			if (friends) {
				await db.friend.delete({
					where: {
						id: friends.id,
					},
				});

				return res
					.status(200)
					.json(new ApiResponse({}, "You Unfollow a User"));
			}

			await db.friend.create({
				data: {
					followerId:userId,
					userId:myId,
				},
			});

			res.status(200).json(new ApiResponse({}, "You Follow a user"));
		} catch (error) {
			next(new ApiError(400, "This is user is not exists "));
		}
	}
);

export {
    followToggle
}