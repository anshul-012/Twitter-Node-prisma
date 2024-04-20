// import { NextFunction, Request, Response } from "express";
// import asyncHandler from "../util/asyncHandler";
// import ApiError from "../util/ApiError";
// import { instance } from "../app";

// export const buyPlan = asyncHandler(
// 	async (req: Request, res: Response, next: NextFunction) => {
		

// 		const option = {
// 			amount: 5000,
// 			currency: "INR",
// 		};

// 		instance.orders.create(option, function (err, order) {
// 			if (err) {
// 				console.log(err);
// 				return next(
// 					new ApiError(
// 						500,
// 						"something went wrong while payment processing"
// 					)
// 				);
// 			} else {
// 				console.log("Order created successfully!");
// 			}
// 			res.status(200).json(order);
// 		});

		
// 	}
// );
