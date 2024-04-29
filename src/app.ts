import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Stripe } from "stripe";
import errorMiddleware from "./middlewares/errorMiddleware";
const app = express();

export const stripeInstance = new Stripe(
	`${process.env.STRIPE_API_SECRET}`
);

app.use(
	cors({
		origin: ["*", "http://localhost:3000"],
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", async (_, res) => {
	res.send("workving fine ⚙️⏳");
});

app.post("/webhook",async(request, response) => {
		const event = request.body;

		console.log(event);
		

		// Handle the event
		switch (event.type) {
			case "payment_intent.succeeded":
				const paymentIntent = event.data.object;
				// Then define and call a method to handle the successful payment intent.
				// handlePaymentIntentSucceeded(paymentIntent);
				break;
			case "payment_method.attached":
				const paymentMethod = event.data.object;
				// Then define and call a method to handle the successful attachment of a PaymentMethod.
				// handlePaymentMethodAttached(paymentMethod);
				break;
			// ... handle other event types
			default:
				console.log(`Unhandled event type ${event.type}`);
		}

		response.json({ received: true });
	}
);

import authRouter from "./routes/authRoutes.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import likeRouter from "./routes/likeRouter.js";
import followRouter from "./routes/friendRoutes.js";
import userRouter from "./routes/userRouter.js";
import paymentRouter from "./routes/paymentRoutes.js";
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/friends", followRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/payments", paymentRouter);

export default app;
app.use(errorMiddleware);
