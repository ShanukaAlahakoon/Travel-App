import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaArrowRight, FaPlane, FaMapMarkedAlt } from "react-icons/fa";
import PlaceCard from "../components/PlaceCard";
import TestimonialSlider from "../components/ReviewSlider.jsx"; // 1. Import TestimonialSlider

// --- ANIMATION COMPONENT ---
const ScrollReveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
      }`}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const [trendingPlaces, setTrendingPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch trending places from backend
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/places")
      .then((res) => {
        const allPlaces = res.data.list || res.data;
        setTrendingPlaces(allPlaces.slice(0, 3));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching places:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-full">
      {/*  SECTION 1: HERO SECTION  */}
      <div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden bg-dark-blue">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/bg.jpg"
            alt="Travel Background"
            className="w-full h-full object-cover object-center animate-[zoomIn_20s_infinite_alternate]"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-dark-blue z-10"></div>

        <div className="relative z-20 w-full max-w-6xl px-4 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/20 backdrop-blur-md text-sky-300 text-[10px] md:text-sm font-semibold tracking-widest uppercase animate-fade-in-down delay-100">
            <FaPlane /> Your AI Travel Companion
          </div>

          <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-2xl animate-fade-in-up">
            DISCOVER <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-blue-500 to-teal-400 filter drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]">
              THE WONDER
            </span>
          </h1>

          <p className="text-gray-200 text-sm md:text-lg max-w-2xl mb-8 font-light leading-relaxed animate-fade-in-up delay-200 px-4">
            Experience Sri Lanka like never before with{" "}
            <span className="text-accent font-bold">TravelMate</span>.
            AI-powered planning for unforgettable journeys.
          </p>

          <div className="flex flex-col w-full px-8 sm:px-0 sm:flex-row gap-4 sm:w-auto animate-fade-in-up delay-300 justify-center items-center">
            <Link
              to="/places"
              className="w-full sm:w-auto group relative px-8 py-3 bg-accent text-white font-bold rounded-full overflow-hidden shadow-[0_0_20px_rgba(14,165,233,0.5)] transition-all hover:scale-105"
            >
              <span className="absolute inset-0 w-full h-full bg-linear-to-r from-sky-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center justify-center gap-2">
                Start Exploring <FaArrowRight />
              </span>
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-3 bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white/10 hover:border-accent/50 transition-all flex items-center justify-center gap-2"
            >
              <FaMapMarkedAlt /> Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/*  SECTION 2: TRENDING DESTINATIONS  */}
      <section className="py-16 px-4 bg-primary">
        <div className="max-w-300 mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-bold text-dark-blue mb-4">
                Trending Destinations
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Most visited places by our community this month.
              </p>
            </div>
          </ScrollReveal>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {trendingPlaces.length > 0 ? (
                  trendingPlaces.map((place) => (
                    <PlaceCard key={place._id} place={place} />
                  ))
                ) : (
                  <p className="text-center col-span-3 text-gray-500">
                    No trending places found.
                  </p>
                )}
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal>
            <div className="text-center mt-10">
              <Link
                to="/places"
                className="inline-block border-2 border-dark-blue text-dark-blue px-8 py-3 rounded-full font-bold hover:bg-dark-blue hover:text-white transition-all"
              >
                View All Places
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/*  SECTION 3: TESTIMONIALS  */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-300 mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-dark-blue mb-4">
                What Travelers Say
              </h2>
              <p className="text-gray-600">
                Stories from people who planned their journey with TravelMate.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <TestimonialSlider />
          </ScrollReveal>
        </div>
      </section>

      {/* Styles */}
      <style>{`
        @keyframes zoomIn {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.2s; }
        .delay-200 { animation-delay: 0.4s; }
        .delay-300 { animation-delay: 0.6s; }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
