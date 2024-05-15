import { NextFunction, Request, Response } from "express";
import asyncHandler from "../util/asyncHandler";
import { SignUPBody } from "../types/Request";
import ApiError from "../util/ApiError";
import db from "../db/prismaClient";
import ApiResponse from "../util/apiResponse";
import { checkPassword, incryptPassword } from "../lib/password";
import { generateJwtToken } from "../lib/jwt";
import sendMail from "../lib/sendMail";

const signUp = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { name, username, email, password }: SignUPBody = req.body;

		if (!name || !username || !email || !password) {
			return next(new ApiError(400, "All field are required !"));
		}

		const existingUser = await db.user.findFirst({
			where: {
				OR: [{ username: username }, { email: email }],
			},
		});

		if (existingUser) {
			return next(
				new ApiError(
					400,
					"User Already exist with this email or userName !"
				)
			);
		}

		const incryptedpassword = await incryptPassword(password);

		const user = await db.user.create({
			data: {
				name,
				username,
				email,
				password: incryptedpassword,
			},
		});

		res.json(new ApiResponse(user, "User Registered Successfully !"));
	}
);

const signin = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { username, password } = req.body;

		if (!username || !password) {
			return next(
				new ApiError(400, "username & Password are required !")
			);
		}

		const user = await db.user.findFirst({
			where: {
				OR: [{ username: username }, { email: username }],
			},
		});

		if (!user) {
			return next(
				new ApiError(
					409,
					"user not exist with this username or email !"
				)
			);
		}

		const isPasswordMatch = checkPassword(user.password!, password);

		if (!isPasswordMatch) {
			return next(new ApiError(400, "Inviald creadinals"));
		}

		const accessToken = await generateJwtToken(
			user.id,
			user.email,
			user.username
		);

		const cookieOptions = {
			secure: true,
			httpOnly: true,
			expires: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
		};

		res.cookie("accessToken", accessToken, cookieOptions).json(
			new ApiResponse(
				{ ...user, accessToken },
				"User Sign In Successfully."
			)
		);
	}
);

const signOut = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		res.clearCookie("accessToken").json(
			new ApiResponse({}, "User SignOut Sucessfully")
		);
	}
);

const forgetPassword = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const userId = String(req.user.id);
		const otp = ~~(1000 + Math.random() * 9000);
		const email = req.user.email;
		const html = `
		<h1>Reset Password</h1>
		<p>Please do not share this OTP with any one</p>
		<p>${otp}</p>
		`;

		const mailInfo = await sendMail(email, "Reset Password", html);

		if (mailInfo) {
			await db.verification.create({
				data: {
					userId: userId,
					otp: otp,
					expireTime: new Date(Date.now() + 2 * 60 * 1000),
				},
			});
		}

		res.status(200).json(new ApiResponse(null, "check your email"));
	}
);

const verifyOtp = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { otp } = req.body;

		if (!otp) {
			return next(new ApiError(400, "OTP is required !"));
		}

		const verificationOfUser = await db.verification.findFirst({
			where: {
				userId: req.user.id,
				expireTime: { gt: new Date() },
			},
		});

		if (verificationOfUser?.otp == otp) {
			await db.verification.update({
				where: {
					userId: req.user.id,
				},
				data: {
					verify: true,
				},
			});

			res.status(200).json(
				new ApiResponse(null, "now you can reset your password")
			);
		}

		res.status(200).json(new ApiResponse(null, "Invalid OTP"));
	}
);

export { signUp, signin, signOut, forgetPassword , verifyOtp};
