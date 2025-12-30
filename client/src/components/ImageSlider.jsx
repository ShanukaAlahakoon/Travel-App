import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ImageSlider({ images }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images && images.length > 1) {
      const interval = setInterval(() => {
        nextSlide();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [current, images]);

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  // පින්තූර නැත්නම් මුකුත් පෙන්වන්න එපා
  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl group bg-gray-200">
      {/* Images with Fade Effect */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover"
          />

          {/* Optional: Dark Overlay for better text visibility if needed */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      ))}

      {/* Navigation Buttons (පින්තූර 1ට වඩා වැඩි නම් පමණක් පෙන්වන්න) */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-accent hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10 backdrop-blur-sm"
          >
            <FaChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-accent hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10 backdrop-blur-sm"
          >
            <FaChevronRight size={18} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {images.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 shadow-sm ${
                  current === index
                    ? "bg-accent w-8"
                    : "bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
