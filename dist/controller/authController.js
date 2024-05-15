"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.forgetPassword = exports.signOut = exports.signin = exports.signUp = void 0;
const asyncHandler_1 = __importDefault(require("../util/asyncHandler"));
const ApiError_1 = __importDefault(require("../util/ApiError"));
const prismaClient_1 = __importDefault(require("../db/prismaClient"));
const apiResponse_1 = __importDefault(require("../util/apiResponse"));
const password_1 = require("../lib/password");
const jwt_1 = require("../lib/jwt");
const sendMail_1 = __importDefault(require("../lib/sendMail"));
const signUp = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
        return next(new ApiError_1.default(400, "All field are required !"));
    }
    const existingUser = await prismaClient_1.default.user.findFirst({
        where: {
            OR: [{ username: username }, { email: email }],
        },
    });
    if (existingUser) {
        return next(new ApiError_1.default(400, "User Already exist with this email or userName !"));
    }
    const incryptedpassword = await (0, password_1.incryptPassword)(password);
    const user = await prismaClient_1.default.user.create({
        data: {
            name,
            username,
            email,
            password: incryptedpassword,
        },
    });
    res.json(new apiResponse_1.default(user, "User Registered Successfully !"));
});
exports.signUp = signUp;
const signin = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return next(new ApiError_1.default(400, "username & Password are required !"));
    }
    const user = await prismaClient_1.default.user.findFirst({
        where: {
            OR: [{ username: username }, { email: username }],
        },
    });
    if (!user) {
        return next(new ApiError_1.default(409, "user not exist with this username or email !"));
    }
    const isPasswordMatch = (0, password_1.checkPassword)(user.password, password);
    if (!isPasswordMatch) {
        return next(new ApiError_1.default(400, "Inviald creadinals"));
    }
    const accessToken = await (0, jwt_1.generateJwtToken)(user.id, user.email, user.username);
    const cookieOptions = {
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    };
    res.cookie("accessToken", accessToken, cookieOptions).json(new apiResponse_1.default({ ...user, accessToken }, "User Sign In Successfully."));
});
exports.signin = signin;
const signOut = (0, asyncHandler_1.default)(async (req, res, next) => {
    res.clearCookie("accessToken").json(new apiResponse_1.default({}, "User SignOut Sucessfully"));
});
exports.signOut = signOut;
const forgetPassword = (0, asyncHandler_1.default)(async (req, res, next) => {
    const userId = String(req.user.id);
    const otp = ~~(1000 + Math.random() * 9000);
    const email = req.user.email;
    const html = `
		<h1>Reset Password</h1>
		<p>Please do not share this OTP with any one</p>
		<p>${otp}</p>
		`;
    const mailInfo = await (0, sendMail_1.default)(email, "Reset Password", html);
    if (mailInfo) {
        await prismaClient_1.default.verification.create({
            data: {
                userId: userId,
                otp: otp,
                expireTime: new Date(Date.now() + 2 * 60 * 1000),
            },
        });
    }
    res.status(200).json(new apiResponse_1.default(null, "check your email"));
});
exports.forgetPassword = forgetPassword;
const verifyOtp = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { otp } = req.body;
    if (!otp) {
        return next(new ApiError_1.default(400, "OTP is required !"));
    }
    const verificationOfUser = await prismaClient_1.default.verification.findFirst({
        where: {
            userId: req.user.id,
            expireTime: { gt: new Date() },
        },
    });
    if (verificationOfUser?.otp == otp) {
        await prismaClient_1.default.verification.update({
            where: {
                userId: req.user.id,
            },
            data: {
                verify: true,
            },
        });
        res.status(200).json(new apiResponse_1.default(null, "now you can reset your password"));
    }
    res.status(200).json(new apiResponse_1.default(null, "Invalid OTP"));
});
exports.verifyOtp = verifyOtp;
