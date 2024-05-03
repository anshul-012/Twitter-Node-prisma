import { NextFunction, Request, Response } from "express";
import asyncHandler from "../util/asyncHandler";
import db from "../db/prismaClient";
import ApiResponse from "../util/apiResponse";
import ApiError from "../util/ApiError";
import { deleteOnCloudinary, uploadOnCloudinary } from "../util/cloudinary";

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
					followers: profile?.followers.length,
					friends: profile?.friends.length,
				},
				"Your Profile"
			)
		);
	}
);

const updateUserAvatar = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req?.user?.id;

		const avatarPath = req.file?.path;

		if (!avatarPath) {
			return next(new ApiError(400, "Image is requied!"));
		}

		const avatar = await uploadOnCloudinary(avatarPath);

		// Delete Previous Avatar
		// ----------------------------------------------------------------

		const deletePrevAvatar = await db.user.findFirst({
			where: {
				id,
			},
		});

		const prevAvatar: any = deletePrevAvatar?.avatar;

		if (prevAvatar) {
			await deleteOnCloudinary(prevAvatar?.public_id);
		}

		//-----------------------------------------------------------------

		const user = await db.user.update({
			where: {
				id,
			},
			data: {
				avatar: {
					url: avatar?.url,
					public_id: avatar?.public_id,
				},
			},
		});

		res.status(200).json(
			new ApiResponse(user, "Avatar is update successfully.")
		);
	}
);

const searchUsers = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { username } = req.params;

		if (!username) {
			return next(new ApiError(400, "username is required !"));
		}

		console.log(username);
		

		const users = await db.user.findMany({
			where: {
				username: {
					startsWith:username,
				},
			},
		});

		res.json(new ApiResponse(users, "All user with this keyWord"));
	}
);

const updateUserDetials = asyncHandler(async(req:Request, res:Response,next:NextFunction)=>{

	const {name , email, tagline, bio} = req.body;
	const userId = req.user.id;
	
	const 
	if(!name || !email || !tagline || !bio ) {
		return next(new ApiError(400, "All fields are required !"))
	}

	const user = await db.user.update({
		where:{
			id:userId
		},
		data:{
			name,
			email,
			bio,
			taglist : tagline
		}
	});

	res.status(200).json(new ApiResponse({},"Your accounts details are updated successfull."))
})

export { getUserProfile, updateUserAvatar, searchUsers };
