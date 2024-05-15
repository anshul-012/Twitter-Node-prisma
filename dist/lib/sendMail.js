"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = async (email, subject, html) => {
    console.log(email, subject, html);
    const transporter = nodemailer_1.default.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "41847b2a3f6b1d",
            pass: "316d6ee4c9fe78",
        },
    });
    const mailInfo = await transporter.sendMail({
        from: "annshulch1@gmail.com",
        to: email,
        subject,
        text: "Hello world?",
        html
    });
    return mailInfo;
};
exports.default = sendMail;
