import { Router } from "express";
import { login, logout, me, signup } from "../controller/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me",authMiddleware, me);

export default authRouter;
