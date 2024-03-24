"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJwtToken = async (id, email, username) => {
    return await jsonwebtoken_1.default.sign({
        id: id,
        email: email,
        username: username
    }, process.env.JWT_SECRET, { expiresIn: "20d" });
};
exports.generateJwtToken = generateJwtToken;
const verifyJWT = async (token) => {
    const user = await jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    return user;
};
exports.verifyJWT = verifyJWT;
