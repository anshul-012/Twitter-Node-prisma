"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = (passedFunction) => async (req, res, next) => {
    return Promise
        .resolve(passedFunction(req, res, next))
        .catch((err) => next(err));
};
exports.default = asyncHandler;
