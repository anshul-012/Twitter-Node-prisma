import { Router } from "express";
import auth from "../middlewares/AuthMiddlewares";
import { followToggle } from "../controller/friendcontroller";

const router = Router();

router.route("/:userId").post(auth,followToggle);
export default router;