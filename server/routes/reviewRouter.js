import express from "express";
import {
  addReview,
  getReviewsByPlace,
  getWebsiteReviews,
  deleteReview,
} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

// 1. Add Review (General Route)
reviewRouter.post("/", addReview);

// 2. Get WEBSITE Reviews (මේක අනිවාර්යයෙන්ම ID Route එකට උඩින් තියෙන්න ඕන)
reviewRouter.get("/website", getWebsiteReviews);

// 3. Get PLACE Reviews
reviewRouter.get("/:placeId", getReviewsByPlace);

// 4. Delete Review
reviewRouter.delete(
  "/:reviewId",

  (req, res, next) => {
    if (req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Access denied." });
    }
  },
  deleteReview
);

export default reviewRouter;
