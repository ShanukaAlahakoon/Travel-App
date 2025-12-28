import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import userRouter from "./routes/userRouter.js";
import placeRouter from "./routes/placeRouter.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const authorizationHeader = req.header("Authorization");

  if (authorizationHeader != null) {
    const token = authorizationHeader.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET, (error, content) => {
      if (!error) {
        req.user = content;
      }
      next();
    });
  } else {
    next();
  }
});

const mongoURI = process.env.MONGO_URL;

mongoose.connect(mongoURI).then(() => {
  console.log("MongoDB connected");
});

app.use("/api/users", userRouter);
app.use("/api/places", placeRouter);

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
