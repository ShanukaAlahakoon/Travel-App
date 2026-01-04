import { useState, useEffect } from "react";
import {
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";

export default function ReviewSlider({ reviews }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Auto-slide logic
  useEffect(() => {
    if (reviews && reviews.length > 1) {
      const interval = setInterval(() => {
        changeSlide("next");
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, reviews?.length]);

  const changeSlide = (direction) => {
    if (!reviews || reviews.length <= 1) return;
    setIsVisible(false);
    setTimeout(() => {
      if (direction === "next") {
        setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
      } else {
        setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
      }
      setIsVisible(true);
    }, 300);
  };

  if (!reviews || reviews.length === 0) return null;

  const review = reviews[currentIndex];
  const userName = review.userId
    ? `${review.userId.firstName} ${review.userId.lastName}`
    : "Anonymous User";

  // Image Logic
  let userImage = "https://via.placeholder.com/150?text=User";
  if (review.userId?.profileImage) {
    userImage = review.userId.profileImage.startsWith("http")
      ? review.userId.profileImage
      : `${import.meta.env.VITE_BACKEND_URL}/${review.userId.profileImage}`;
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl text-center relative min-h-87.5 flex flex-col justify-center border border-gray-50">
        <FaQuoteLeft className="text-6xl text-accent/5 absolute top-8 left-8" />

        <div
          className={`transition-all duration-500 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex justify-center mb-6">
            <img
              src={userImage}
              alt={userName}
              className="w-20 h-20 rounded-full object-cover border-4 border-accent/20 shadow-inner"
            />
          </div>

          <div className="mb-6 px-4">
            <p className="text-gray-600 text-lg italic leading-relaxed">
              "{review.comment}"
            </p>
          </div>

          <div>
            <h3 className="text-xl font-black text-dark-blue">{userName}</h3>
            <div className="flex justify-center gap-1 mt-3 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < review.rating ? "text-yellow-400" : "text-gray-200"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {reviews.length > 1 && (
        <>
          <button
            onClick={() => changeSlide("prev")}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-accent hover:text-white transition-all"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => changeSlide("next")}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-accent hover:text-white transition-all"
          >
            <FaChevronRight />
          </button>
        </>
      )}
    </div>
  );
}
