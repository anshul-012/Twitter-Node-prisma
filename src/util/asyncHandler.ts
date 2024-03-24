import { NextFunction, Request, Response } from "express";

const asyncHandler = (passedFunction: Function) =>
	async (req: Request, res: Response, next: NextFunction) => 
    {		
        return Promise
            .resolve(passedFunction(req, res, next))
            .catch((err) =>next(err));
	};

export default asyncHandler;
