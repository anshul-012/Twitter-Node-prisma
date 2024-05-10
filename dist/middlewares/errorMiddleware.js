"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Something went wrong";
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        message: err.message,
        success: err.success,
    });
};
exports.default = errorMiddleware;
