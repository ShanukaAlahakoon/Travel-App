import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash, FaStar, FaQuoteLeft } from "react-icons/fa";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Reviews Fetch Function
  const fetchReviews = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/reviews/website")
      .then((res) => {
        setReviews(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Delete Review Function
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    const token = localStorage.getItem("token");

    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/reviews/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Review deleted successfully!");
        setReviews(reviews.filter((r) => r._id !== id));
      })
      .catch(() => toast.error("Failed to delete review"));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-dark-blue mb-6">
        Manage Website Reviews
      </h2>

      {isLoading ? (
        <div className="text-center text-gray-500">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center text-gray-500 bg-white p-10 rounded-xl">
          No reviews found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => {
            // User info handling
            const userName = review.userId
              ? review.userId.firstName
              : "Unknown User";
            const userImg = review.userId?.profileImage
              ? review.userId.profileImage.startsWith("http")
                ? review.userId.profileImage
                : `${import.meta.env.VITE_BACKEND_URL}/${
                    review.userId.profileImage
                  }`
              : "https://via.placeholder.com/40";

            return (
              <div
                key={review._id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative group hover:shadow-md transition-all"
              >
                <FaQuoteLeft className="text-accent/10 text-4xl absolute top-4 right-4" />

                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={userImg}
                    alt={userName}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    referrerPolicy="no-referrer"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/40")
                    }
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{userName}</h4>
                    <div className="flex text-yellow-400 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < review.rating ? "" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 italic mb-4 line-clamp-3">
                  "{review.comment}"
                </p>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="flex items-center gap-2 text-red-500 hover:text-white hover:bg-red-500 px-3 py-1.5 rounded-lg text-sm font-medium transition-all bg-red-50"
                  >
                    <FaTrash size={14} /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
