import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";

export default function TestimonialSlider() {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/reviews/website")
      .then((res) => {
        setReviews(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (reviews.length > 1) {
      const interval = setInterval(() => {
        changeSlide("next");
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, reviews.length]);

  const changeSlide = (direction) => {
    if (reviews.length <= 1) return;

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

  if (isLoading) {
    return (
      <div className="flex justify-center h-50 items-center">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-3xl shadow-lg">
        <p className="text-gray-500">
          No reviews available yet. Be the first to review!
        </p>
      </div>
    );
  }

  const review = reviews[currentIndex];

  const userName = review.userId
    ? review.userId.firstName + " " + review.userId.lastName
    : "Anonymous User";

  let userImage = "https://via.placeholder.com/150?text=User";

  if (review.userId?.profileImage) {
    if (review.userId.profileImage.startsWith("http")) {
      userImage = review.userId.profileImage;
    } else {
      userImage = `${import.meta.env.VITE_BACKEND_URL}/${
        review.userId.profileImage
      }`;
    }
  }
  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 md:px-0">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center relative min-h-105 flex flex-col justify-center">
        <FaQuoteLeft className="text-5xl text-accent/10 absolute top-6 left-6" />

        <div
          className={`transition-opacity duration-300 ease-in-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* User Image */}
          <div className="flex justify-center mb-6">
            <img
              src={userImage}
              alt={userName}
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-full object-cover border-4 border-accent shadow-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150?text=User";
              }}
            />
          </div>

          {/* Comment Text */}
          <div className="h-20 mb-6 flex items-center justify-center overflow-hidden px-4">
            <p className="text-gray-600 text-lg md:text-xl italic leading-relaxed line-clamp-2">
              "{review.comment}"
            </p>
          </div>

          {/* Name & Role */}
          <div>
            <h3 className="text-2xl font-bold text-dark-blue">{userName}</h3>
            <p className="text-accent font-medium text-sm uppercase tracking-wider">
              Traveler
            </p>
          </div>

          {/* Rating Stars */}
          <div className="flex justify-center gap-1 mt-4 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < review.rating ? "text-yellow-400" : "text-gray-300"
                }
              />
            ))}
          </div>
        </div>
      </div>

      {reviews.length > 1 && (
        <>
          <button
            onClick={() => changeSlide("prev")}
            className="absolute top-1/2 -left-3 md:-left-5 transform -translate-y-1/2 bg-white text-dark-blue p-3 rounded-full shadow-lg hover:bg-accent hover:text-white transition-all z-10"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => changeSlide("next")}
            className="absolute top-1/2 -right-3 md:-right-5 transform -translate-y-1/2 bg-white text-dark-blue p-3 rounded-full shadow-lg hover:bg-accent hover:text-white transition-all z-10"
          >
            <FaChevronRight />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (index !== currentIndex) {
                    setIsVisible(false);
                    setTimeout(() => {
                      setCurrentIndex(index);
                      setIsVisible(true);
                    }, 300);
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-accent w-8" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
