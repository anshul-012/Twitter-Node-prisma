import { Router } from "express";
import auth from "../middlewares/AuthMiddlewares.js";
import { followToggle } from "../controller/friendcontroller.js";

const router = Router();

router.route("/:userId").post(auth,followToggle);
export default router;