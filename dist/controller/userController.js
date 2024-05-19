import asyncHandler from "../util/asyncHandler.js";
import db from "../db/prismaClient.js";
import ApiResponse from "../util/apiResponse.js";
import ApiError from "../util/ApiError.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../util/cloudinary.js";
import { checkPassword, incryptPassword } from "../lib/password.js";
const getUserProfile = asyncHandler(async (req, res, next) => {
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
    res.status(200).json(new ApiResponse({
        ...profile,
        followers: profile?.followers.length,
        friends: profile?.friends.length,
    }, "Your Profile"));
});
const updateUserAvatar = asyncHandler(async (req, res, next) => {
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
    const prevAvatar = deletePrevAvatar?.avatar;
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
    res.status(200).json(new ApiResponse(user, "Avatar is update successfully."));
});
const searchUsers = asyncHandler(async (req, res, next) => {
    const { username } = req.params;
    if (!username) {
        return next(new ApiError(400, "username is required !"));
    }
    const users = await db.user.findMany({
        where: {
            username: {
                startsWith: username,
            },
        },
    });
    res.json(new ApiResponse(users, "All user with this keyWord"));
});
const changePassword = asyncHandler(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return next(new ApiError(400, "old and new Passwords both are required !"));
    }
    const user = await db.user.findFirst({
        where: {
            id: req.user.id,
        },
    });
    console.log(user);
    const isPasswordMatch = checkPassword(user?.password, oldPassword);
    if (!isPasswordMatch) {
        return next(new ApiError(401, "Password is Incorrect !"));
    }
    const encrypted = incryptPassword(newPassword);
    await db.user.update({
        where: {
            id: req.user.id,
        },
        data: {
            password: encrypted,
        },
    });
    res.status(200).json(new ApiResponse(null, "Your password was changed successfully"));
});
export { getUserProfile, updateUserAvatar, searchUsers, changePassword };
