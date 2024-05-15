"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.searchUsers = exports.updateUserAvatar = exports.getUserProfile = void 0;
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
const prismaClient_1 = __importDefault(require("../db/prismaClient"));
const apiResponse_1 = __importDefault(require("../util/apiResponse"));
const ApiError_1 = __importDefault(require("../util/ApiError"));
const cloudinary_1 = require("../util/cloudinary");
const password_1 = require("../lib/password");
const getUserProfile = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { username } = req.params;
    const profile = await prismaClient_1.default.user.findFirst({
        where: {
            username,
        },
        include: {
            posts: true,
            followers: true,
            friends: true,
        },
    });
    res.status(200).json(new apiResponse_1.default({
        ...profile,
        followers: profile?.followers.length,
        friends: profile?.friends.length,
    }, "Your Profile"));
});
exports.getUserProfile = getUserProfile;
const updateUserAvatar = (0, asyncHandler_1.default)(async (req, res, next) => {
    const id = req?.user?.id;
    const avatarPath = req.file?.path;
    if (!avatarPath) {
        return next(new ApiError_1.default(400, "Image is requied!"));
    }
    const avatar = await (0, cloudinary_1.uploadOnCloudinary)(avatarPath);
    // Delete Previous Avatar
    // ----------------------------------------------------------------
    const deletePrevAvatar = await prismaClient_1.default.user.findFirst({
        where: {
            id,
        },
    });
    const prevAvatar = deletePrevAvatar?.avatar;
    if (prevAvatar) {
        await (0, cloudinary_1.deleteOnCloudinary)(prevAvatar?.public_id);
    }
    //-----------------------------------------------------------------
    const user = await prismaClient_1.default.user.update({
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
    res.status(200).json(new apiResponse_1.default(user, "Avatar is update successfully."));
});
exports.updateUserAvatar = updateUserAvatar;
const searchUsers = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { username } = req.params;
    if (!username) {
        return next(new ApiError_1.default(400, "username is required !"));
    }
    const users = await prismaClient_1.default.user.findMany({
        where: {
            username: {
                startsWith: username,
            },
        },
    });
    res.json(new apiResponse_1.default(users, "All user with this keyWord"));
});
exports.searchUsers = searchUsers;
const changePassword = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return next(new ApiError_1.default(400, "old and new Passwords both are required !"));
    }
    const user = await prismaClient_1.default.user.findFirst({
        where: {
            id: req.user.id,
        },
    });
    console.log(user);
    const isPasswordMatch = (0, password_1.checkPassword)(user?.password, oldPassword);
    if (!isPasswordMatch) {
        return next(new ApiError_1.default(401, "Password is Incorrect !"));
    }
    const encrypted = (0, password_1.incryptPassword)(newPassword);
    await prismaClient_1.default.user.update({
        where: {
            id: req.user.id,
        },
        data: {
            password: encrypted,
        },
    });
    res.status(200).json(new apiResponse_1.default(null, "Your password was changed successfully"));
});
exports.changePassword = changePassword;
