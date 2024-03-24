"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({
    path: "./.env"
});
const app_js_1 = __importDefault(require("./app.js"));
const prismaClient_js_1 = __importDefault(require("./db/prismaClient.js"));
prismaClient_js_1.default.$connect().then(() => {
    console.log("⏳ Prisma is connected with db");
});
const port = process.env.PORT;
app_js_1.default.listen(port, () => {
    console.log("⚙️  server is start running on ", port);
});
