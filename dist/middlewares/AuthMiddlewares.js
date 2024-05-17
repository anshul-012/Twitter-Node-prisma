import asyncHandler from "../util/asyncHandler.js";
import db from "../db/prismaClient.js";
import jwt from "jsonwebtoken";
import ApiError from "../util/ApiError.js";
const auth = asyncHandler(async (req, res, next) => {
    const { accessToken } = req?.cookies;
    console.log(accessToken, req);
    if (!accessToken) {
        return next(new ApiError(401, "unauthorized user !!!"));
    }
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await db.user.findUnique({
        where: { id: decodedToken?.id },
    });
    if (!user) {
        return next(new ApiError(401, "Invail access Token"));
    }
    req.user = user;
    next();
});
export default auth;
