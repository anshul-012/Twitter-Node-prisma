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
exports.stripeInstance = new stripe_1.Stripe(`sk_test_51Orf6TSG6eGnrw34SPt50at81CXlcIKnNitZZPqM0EiWCqtViCvPz13OqfUBnMvo0dTKZGkCvD4bmF9Urvw5pCPi00TXyza6W7`);
app.use((0, cors_1.default)({
    origin: ["*", "http://localhost:3000"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.get("/health", async (_, res) => {
    res.send("workving fine ⚙️⏳");
});
app.post("/webhook", async (request, response) => {
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
