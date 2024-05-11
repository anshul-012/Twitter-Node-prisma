import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Stripe } from "stripe";
import errorMiddleware from "./middlewares/errorMiddleware";
const app = express();

export const stripeInstance = new Stripe(
	"sk_test_51PD2CUSH17005eDbS9GgdDN2bBSVTch0z4YH3007pv82mJRGWfrhNxo4laJicmPVCRUT6nFBPPc7bY7uITlKwov300PMuYvTS1"
);

app.use(
	cors({
		origin: [
			"https://main--gilded-pastelito-dd66fd.netlify.app",
			"http://localhost:5173",
			"http://localhost:3000"
		],
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use();

app.get("/health", async (_, res) => {
	res.send("workving fine ⚙️⏳");
});
const endpointSecret =
	"whsec_7670c110f045cf558980f735d0a08396e6f60acbcd00d32d5ec3fe89a3fcab29";
app.post(
	"/webhook",
	express.json({type: 'application/json'}),
	(request, response) => {
		// console.log(request.headers);

	 const event = request.body;
	 console.log("event---------------",event);
	 
	// try {
			
	// 		const sig = request.headers["stripe-signature"];
	// 		const event = stripeInstance.webhooks.constructEvent(
	// 			JSON.stringify(request.body),
	// 			sig!,
	// 			endpointSecret
	// 		);
			
	// 		console.log("ffdsfsd");
	// 		console.log("----------------------------------------");
	// 		console.log(event.type);
	
	// 		// Handle the event
	// 		switch (event.type) {
	// 			case "payment_intent.succeeded":
	// 				const paymentIntent = event.data.object;
	// 				console.log(paymentIntent, "PaymentIntent was successful!");
	// 				break;
	// 			case "payment_method.attached":
	// 				const paymentMethod = event.data.object;
	// 				console.log("PaymentMethod was attached to a Customer!");
	// 				console.log(paymentMethod);
	
	// 				break;
	// 			// ... handle other event types
	// 			default:
	// 				console.log(`Unhandled event type ${event.type}`);
	// 		}
	// } catch (error) {
	// 	console.log(error);
		
	// }

		// Return a 200 response to acknowledge receipt of the event
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
import db from "./db/prismaClient";
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/friends", followRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/payments", paymentRouter);

export default app;
app.use(errorMiddleware);
