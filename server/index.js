import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import userRouter from "./routes/userRouter.js";
import placeRouter from "./routes/placeRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import tripRouter from "./routes/tripRouter.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const authorizationHeader = req.header("Authorization");

  if (authorizationHeader != null) {
    const token = authorizationHeader.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET, (error, content) => {
      if (error) {
        // වැරැද්දක් තිබුණොත් පමණක් ලොග් කරන්න
        console.log("JWT Verification Error:", error.message);
      } else {
        // ටෝකන් එක සාර්ථක නම් පමණක් user දත්ත ඇතුළත් කරන්න
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
app.use("/api/reviews", reviewRouter);
app.use("/api/trips", tripRouter);

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
