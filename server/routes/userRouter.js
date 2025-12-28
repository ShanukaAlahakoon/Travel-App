import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const userRouter = express.Router();

// http://localhost:5000/api/users/register
userRouter.post("/register", registerUser);

// http://localhost:5000/api/users/login
userRouter.post("/login", loginUser);

export default userRouter;
