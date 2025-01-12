import { NextFunction, Request, Response } from "express";
import asyncHandler from "../util/asyncHandler";
import db from "../db/prismaClient";
import ApiResponse from "../util/apiResponse";
import ApiError from "../util/ApiError";

const likeToggle = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { postId } = req.params;
		const userId = req?.user?.id;

		try {
            let like = await db.like.findFirst({
            			where: {
            				postId: Number(postId),
							userId
            			},
            		});
            
            		if (like) {
            			await db.like.delete({
            				where: {
            					id: like.id,
            				},
            			});
            
            			return res
            				.status(200)
            				.json(new ApiResponse({}, "You Unlike a post"));
            		}
            
            		await db.like.create({
            			data: {
            				postId: Number(postId),
            				userId,
            			},
            		});
            
            		res.status(200).json(new ApiResponse({}, "You like a post"));
        } catch (error) {
            
            next(new ApiError(400,"This is post is not exists "))
        }

	}
);

const likedPostOfUser = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const userId = req?.user?.id;

    const posts = await db.like.findMany({
        where:{
            userId
        },
        include:{
            post:true,
            user:{
                select:{
                    username:true,
                    avatar:true,
                }
            }
        }
    })

    res.status(200).json(new ApiResponse(posts, "All your Liked Post"))
})
export {
    likeToggle, likedPostOfUser
}
