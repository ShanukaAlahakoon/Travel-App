import Review from "../models/Review.js";

// 1. Review එකක් එකතු කිරීම (Place හෝ Website සඳහා)
export async function addReview(req, res) {
  try {
    const { placeId, rating, comment } = req.body;

    // User ලොග් වෙලාදැයි බැලීම
    if (!req.user) {
      return res.status(401).json({ message: "Please login to add a review" });
    }

    // Rating එක 1-5 අතර තිබිය යුතුයි
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const newReview = new Review({
      userId: req.user.id,
      placeId: placeId || null, // placeId නැත්නම් null (Website Review)
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (err) {
    console.error("Add Review Error:", err);
    res.status(500).json({ error: "Failed to add review. Try again later." });
  }
}

// 2. යම් ස්ථානයකට (Place) අදාළ Reviews ලබා ගැනීම
export async function getReviewsByPlace(req, res) {
  try {
    const { placeId } = req.params;

    const reviews = await Review.find({ placeId: placeId, isVisible: true })
      .populate("userId", "firstName lastName profileImage") // User ගේ විස්තර ගනියි
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    console.error("Fetch Place Reviews Error:", err);
    res.status(500).json({ error: "Failed to fetch place reviews" });
  }
}

// 3. Website එකට අදාළ Reviews ලබා ගැනීම (placeId: null ඒවා)
export async function getWebsiteReviews(req, res) {
  try {
    const reviews = await Review.find({ placeId: null, isVisible: true })
      .populate("userId", "firstName lastName profileImage")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    console.error("Fetch Website Reviews Error:", err);
    res.status(500).json({ error: "Failed to fetch website reviews" });
  }
}

// 4. Review එකක් Delete කිරීම (Admin Only)
export async function deleteReview(req, res) {
  try {
    const { reviewId } = req.params;

    // Auth Middleware එකෙන් req.user ලැබෙන බව තහවුරු කරගන්න
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error("Delete Review Error:", err);
    res.status(500).json({ error: "Failed to delete review" });
  }
}
