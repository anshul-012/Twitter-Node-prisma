import { config } from "dotenv";
config({
    path: "./.env"
});
import app from "./app.js";
import prisma from "./db/prismaClient.js";
prisma.$connect().then(() => {
    console.log("⏳ Prisma is connected with db");
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log("⚙️  server is start running on ", port);
});
