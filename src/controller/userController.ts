import { NextFunction, Request, Response } from "express";
import asyncHandler from "../util/asyncHandler";
import db from "../db/prismaClient";
import ApiResponse from "../util/apiResponse";

const getUserProfile = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { username } = req.params;

		const profile = await db.user.findFirst({
			where: {
				username,
			},
			include: {
				posts: true,
				followers: true,
				friends: true,
			},
		});

		res.status(200).json(
			new ApiResponse(
				{
					...profile,
					follower: profile?.followers.length,
					friends: profile?.friends.length,
				},
				"Your Profile"
			)
		);
	}
);


export { getUserProfile };
