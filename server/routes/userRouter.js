import express from "express";
import {
  registerUser,
  loginUser,
  getUsersCount,
} from "../controllers/userController.js";

const userRouter = express.Router();

// http://localhost:5000/api/users/register
userRouter.post("/register", registerUser);

// http://localhost:5000/api/users/login
userRouter.post("/login", loginUser);

// http://localhost:5000/api/users/count
userRouter.get("/count", getUsersCount);

export default userRouter;
