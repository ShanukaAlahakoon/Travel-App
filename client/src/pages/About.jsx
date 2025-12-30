import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaUsers, FaGlobeAsia, FaAward, FaSmile } from "react-icons/fa";
import TestimonialSlider from "../components/ReviewSlider.jsx";

// --- SCROLL ANIMATION COMPONENT ---
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
    if (ref.current) observer.observe(ref.current);
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

export default function About() {
  const [stats, setStats] = useState({
    places: 0,
    users: 0,
  });

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/places")
      .then((res) => {
        const count = res.data.list ? res.data.list.length : res.data.length;
        setStats((prev) => ({ ...prev, places: count }));
      })
      .catch((err) => console.error(err));

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/users/count")
      .then((res) => {
        setStats((prev) => ({ ...prev, users: res.data.count }));
      })
      .catch((err) => console.error(err));
    setStats((prev) => ({ ...prev, users: 10 }));
  }, []);

  return (
    <div className="w-full">
      {/* SECTION 1: HERO */}
      <div className="relative w-full h-[60vh] flex items-center justify-center bg-dark-blue overflow-hidden">
        <img
          src="/bg.jpg"
          alt="About Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-xl">
            About <span className="text-accent">Us</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-2xl max-w-2xl mx-auto font-light">
            We are passionate about making your Sri Lankan journey
            unforgettable.
          </p>
        </div>
      </div>

      {/* SECTION 2: OUR STORY */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-300 mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/about1.jpg"
                    alt="Our Story"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-accent/10"></div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-accent font-bold uppercase tracking-widest mb-2">
                  Our Story
                </h3>
                <h2 className="text-3xl md:text-5xl font-bold text-dark-blue mb-6">
                  Empowering Travelers Since 2024
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  TravelMate began with a simple idea: to show the world the
                  true beauty of Sri Lanka beyond the guidebooks.
                </p>
                <div className="flex gap-4">
                  <div className="border-l-4 border-accent pl-4">
                    <h4 className="font-bold text-dark-blue text-xl">
                      Our Mission
                    </h4>
                    <p className="text-sm text-gray-500">
                      To simplify travel planning.
                    </p>
                  </div>
                  <div className="border-l-4 border-accent pl-4">
                    <h4 className="font-bold text-dark-blue text-xl">
                      Our Vision
                    </h4>
                    <p className="text-sm text-gray-500">
                      To be the #1 travel guide in Asia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3:  STATS */}
      <section className="py-16 bg-dark-blue text-white">
        <div className="max-w-300 mx-auto px-4">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <FaUsers className="text-4xl text-accent mx-auto mb-4" />
                {/*  User Count */}
                <h3 className="text-4xl font-bold mb-2">{stats.users}+</h3>
                <p className="text-gray-400">Happy Travelers</p>
              </div>

              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <FaGlobeAsia className="text-4xl text-accent mx-auto mb-4" />
                {/*  Places Count */}
                <h3 className="text-4xl font-bold mb-2">{stats.places}+</h3>
                <p className="text-gray-400">Destinations</p>
              </div>

              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <FaAward className="text-4xl text-accent mx-auto mb-4" />
                <h3 className="text-4xl font-bold mb-2">#1</h3>
                <p className="text-gray-400">Travel App</p>
              </div>

              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <FaSmile className="text-4xl text-accent mx-auto mb-4" />
                <h3 className="text-4xl font-bold mb-2">100%</h3>
                <p className="text-gray-400">Satisfaction</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 4: SLIDING REVIEWS */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-300 mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-dark-blue mb-4">
                Loved by Travelers
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it. See what our community says.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <TestimonialSlider />
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 5: CTA */}
      <section className="py-20 px-4 bg-white text-center">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-dark-blue mb-6">
              Ready to start your journey?
            </h2>
            <Link
              to="/contact"
              className="inline-block bg-accent hover:bg-sky-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-accent/40 transition-all transform hover:scale-105"
            >
              Contact Us Now
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
