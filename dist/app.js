"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// Health route testing
app.get("/health", async (_, res) => {
    res.send("workving fine ⚙️⏳");
});
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const postRoutes_js_1 = __importDefault(require("./routes/postRoutes.js"));
const commentRoutes_js_1 = __importDefault(require("./routes/commentRoutes.js"));
const likeRouter_js_1 = __importDefault(require("./routes/likeRouter.js"));
app.use("/api/v1/auth", authRoutes_js_1.default);
app.use("/api/v1/posts", postRoutes_js_1.default);
app.use("/api/v1/comments", commentRoutes_js_1.default);
app.use("/api/v1/likes", likeRouter_js_1.default);
exports.default = app;
app.use(errorMiddleware_1.default);
