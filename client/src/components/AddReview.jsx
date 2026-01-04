import { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AddReview({ placeId, onReviewAdded }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      return toast.error("Please login to submit a review!");
    }

    if (rating === 0) return toast.error("Please select a rating!");

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/add`,
        { placeId, rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Review added successfully!");
      setComment("");
      setRating(0);

      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add review");
    }
  };

  if (!token) {
    return (
      <div className="bg-blue-50 p-6 rounded-3xl text-center border border-blue-100 my-10">
        <p className="text-gray-600 mb-4 font-medium">
          Please login to share your experience and rate this place.
        </p>
        <a href="/login" className="text-accent font-bold hover:underline">
          Login Now
        </a>
      </div>
    );
  }

  return (
    <div className="mt-10 max-w-2xl">
      <h3 className="text-xl font-bold text-dark-blue mb-6">Write a Review</h3>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-50 p-6 rounded-3xl border border-gray-100 shadow-sm"
      >
        <p className="font-bold mb-3 text-gray-700">How was your experience?</p>

        <div className="flex gap-2 mb-4">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  className="hidden"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />
                <FaStar
                  className="cursor-pointer transition-all"
                  color={
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  size={28}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>

        <textarea
          className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-accent/20 min-h-32 mb-4"
          placeholder="Share your experience here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>

        <button
          type="submit"
          className="bg-accent text-white px-10 py-3.5 rounded-2xl font-bold hover:bg-sky-600 transition-all shadow-lg shadow-accent/20"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
