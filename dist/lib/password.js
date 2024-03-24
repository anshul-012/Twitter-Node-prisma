"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.incryptPassword = exports.checkPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const checkPassword = (incryptedpassword, password) => {
    return bcrypt_1.default.compareSync(password, incryptedpassword);
};
exports.checkPassword = checkPassword;
const incryptPassword = (password) => {
    return bcrypt_1.default.hashSync(password, 10);
};
exports.incryptPassword = incryptPassword;
