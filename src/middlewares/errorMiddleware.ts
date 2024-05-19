import { NextFunction, Request, Response } from "express";
import ApiError from "../util/ApiError.js";

const errorMiddleware = (
	err: ApiError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	err.message = err.message || "Something went wrong";
	err.statusCode = err.statusCode || 500;

	res.status(err.statusCode).json({
		message: err.message,
		success: err.success,
	});
};

export default errorMiddleware;




