import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errorMiddleware";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser())

// Health route testing
app.get("/health", async (_, res) => {
	res.send("workving fine ⚙️⏳");
});


import authRouter from "./routes/authRoutes.js"
import postRouter from "./routes/postRoutes.js"

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts",postRouter);
export default app;
app.use(errorMiddleware); 