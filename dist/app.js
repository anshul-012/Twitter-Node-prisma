"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeInstance = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const stripe_1 = require("stripe");
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const app = (0, express_1.default)();
exports.stripeInstance = new stripe_1.Stripe("sk_test_51PD2CUSH17005eDbS9GgdDN2bBSVTch0z4YH3007pv82mJRGWfrhNxo4laJicmPVCRUT6nFBPPc7bY7uITlKwov300PMuYvTS1");
app.use((0, cors_1.default)({
    origin: ["*", "http://localhost:5173"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// app.use();
app.get("/health", async (_, res) => {
    res.send("workving fine ⚙️⏳");
});
const endpointSecret = "whsec_7670c110f045cf558980f735d0a08396e6f60acbcd00d32d5ec3fe89a3fcab29";
app.post("/webhook", express_1.default.json({ type: 'application/json' }), (request, response) => {
    // console.log(request.headers);
    const event = request.body;
    console.log("event---------------", event);
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
});
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const postRoutes_js_1 = __importDefault(require("./routes/postRoutes.js"));
const commentRoutes_js_1 = __importDefault(require("./routes/commentRoutes.js"));
const likeRouter_js_1 = __importDefault(require("./routes/likeRouter.js"));
const friendRoutes_js_1 = __importDefault(require("./routes/friendRoutes.js"));
const userRouter_js_1 = __importDefault(require("./routes/userRouter.js"));
const paymentRoutes_js_1 = __importDefault(require("./routes/paymentRoutes.js"));
app.use("/api/v1/auth", authRoutes_js_1.default);
app.use("/api/v1/posts", postRoutes_js_1.default);
app.use("/api/v1/comments", commentRoutes_js_1.default);
app.use("/api/v1/likes", likeRouter_js_1.default);
app.use("/api/v1/friends", friendRoutes_js_1.default);
app.use("/api/v1/users", userRouter_js_1.default);
app.use("/api/v1/payments", paymentRoutes_js_1.default);
exports.default = app;
app.use(errorMiddleware_1.default);
