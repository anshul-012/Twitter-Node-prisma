import { NextFunction, Request, Response } from "express";
import asyncHandler from "../util/asyncHandler";
// import ApiError from "../util/ApiError";
import { stripeInstance } from "../app";
import ApiError from "../util/ApiError";
import db from "../db/prismaClient";
import ApiResponse from "../util/apiResponse";
import { PaymentPayloadBodyType } from "../types/Request";

export const buyPlan = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { payment }: { payment: PaymentPayloadBodyType } = req.body;
		
		const lineItem = [
			{
				price_data: {
					currency: "inr",
					product_data: {
						name: payment.name,
						images: [payment.image],
					},
					unit_amount: Number(payment.price) * 100,
				},
				quantity: 1,
			},
		];

		const session = await stripeInstance.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItem,
			mode: "payment",
			success_url: "http://localhost:5173/me",
			cancel_url: "http://localhost:5173/setting",
			metadata : {
				userId: payment.userId,
			},
		});

		res.json({ id: session.id });
	}
);

export const blueTick = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { userId }: { userId: string } = req.body;

		if (userId) {
			return next(new ApiError(400, "userID is required !"));
		}

		await db.user.update({
			where: {
				id: userId,
			},
			data: {
				blueTick: true,
			},
		});

		res.status(200).json(new ApiResponse({}, "user is verified now"));
	}
);
