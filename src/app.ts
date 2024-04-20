import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errorMiddleware";
// import Razorpay from "razorpay";
const app = express();

// export const instance = new Razorpay({
// 	key_id: "rzp_test_yllbbYSQNH6DV4",
// 	key_secret: "b7NRlKNRFLHTOzJPArT3gIF1",
// });


app.use(
	cors({
		origin: [
			"*",
			"http://localhost:3000",
		],
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", async (_, res) => {
	res.send("workving fine ⚙️⏳");
});


import authRouter from "./routes/authRoutes.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import likeRouter from "./routes/likeRouter.js";
import followRouter from "./routes/friendRoutes.js";
import userRouter from "./routes/userRouter.js";
// import paymentRouter from "./routes/paymentRoutes.js";
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts",postRouter);
app.use("/api/v1/comments",commentRouter);
app.use("/api/v1/likes",likeRouter);
app.use("/api/v1/friends",followRouter);
app.use("/api/v1/users",userRouter);
// app.use("/api/v1/payments",paymentRouter);

export default app;
app.use(errorMiddleware); 
