import Review from "../models/Review.js";

// 1. Add Review (Place එකට හෝ Website එකට)
export function addReview(req, res) {
  // placeId එන්නත් පුළුවන්, නොඑන්නත් පුළුවන්
  const { placeId, rating, comment } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Please login to add a review" });
  }

  const newReview = new Review({
    userId: req.user.id,
    placeId: placeId || null, // placeId නැත්නම් null දානවා (Website Review)
    rating: rating,
    comment: comment,
  });

  newReview
    .save()
    .then(() => {
      res.json({ message: "Review added successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to add review" });
    });
}

// 2. Get Reviews for a Specific Place
export function getReviewsByPlace(req, res) {
  const { placeId } = req.params;

  Review.find({ placeId: placeId, isVisible: true })
    .populate("userId", "firstName lastName profileImage")
    .sort({ createdAt: -1 })
    .then((reviews) => {
      res.json(reviews);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch place reviews" });
    });
}

// 3. (අලුත් Function) Get Website Reviews (placeId: null ඒවා)
export function getWebsiteReviews(req, res) {
  // placeId එක null වෙච්ච ඒවා හොයනවා
  Review.find({ placeId: null, isVisible: true })
    .populate("userId", "firstName lastName profileImage")
    .sort({ createdAt: -1 })
    .then((reviews) => {
      res.json(reviews);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch website reviews" });
    });
}

// 4. Delete Review (Admin Only)
export function deleteReview(req, res) {
  const { reviewId } = req.params;

  // 1. මුලින්ම බලනවා User කෙනෙක් Log වෙලාද කියලා (req.user තියෙනවද?)
  if (!req.user) {
    return res.status(401).json({ message: "Please login first." });
  }

  // 2. ඊළඟට බලනවා ඒ User ගේ role එක "admin" ද කියලා
  if (req.user.role !== "admin") {
    // Admin නෙවෙයි නම් 403 (Forbidden) Error එකක් යවනවා
    return res
      .status(403)
      .json({ message: "Access denied. You are not an admin." });
  }

  // 3. ඔක්කොම හරි නම් විතරක් Delete කරනවා
  Review.findByIdAndDelete(reviewId)
    .then(() => {
      res.json({ message: "Review deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to delete review" });
    });
}
