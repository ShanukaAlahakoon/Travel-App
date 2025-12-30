import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaUsers,
  FaGlobeAsia,
  FaAward,
  FaSmile,
  FaRocket,
  FaLightbulb,
  FaMapMarked,
  FaHandshake,
} from "react-icons/fa";
import ImageSlider from "../components/ImageSlider.jsx";

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
      .catch((err) => {
        console.error(err);
        setStats((prev) => ({ ...prev, users: 10 }));
      });
  }, []);

  const aboutImages = ["/about1.jpg", "/about4.jpg", "/about3.jpg"];

  return (
    <div className="w-full">
      {/* SECTION 1: HERO SECTION */}
      <div className="relative w-full h-[60vh] flex items-center justify-center bg-dark-blue overflow-hidden">
        <img
          src="/bg.jpg"
          alt="About Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-xl">
            Who We <span className="text-accent">Are</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-2xl max-w-2xl mx-auto font-light">
            Your ultimate companion for exploring the hidden wonders of Sri
            Lanka.
          </p>
        </div>
      </div>

      {/* SECTION 2: INTRODUCTION (Image Left, Text Right) */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2 relative">
                <div className="h-100 shadow-2xl rounded-2xl overflow-hidden">
                  <ImageSlider images={aboutImages} />
                </div>{" "}
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-accent font-bold uppercase tracking-widest mb-2">
                  Welcome to TravelMate
                </h3>
                <h2 className="text-4xl font-bold text-dark-blue mb-6 leading-tight">
                  We Connect You to the Soul of Sri Lanka
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  TravelMate isn't just a directory of places; it's a smart
                  ecosystem designed for modern explorers. We combine technology
                  with local insights to offer a seamless travel planning
                  experience.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Whether you are looking for ancient history, pristine beaches,
                  or hidden hiking trails, our platform curates the best
                  experiences tailored just for you.
                </p>

                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/10 p-3 rounded-full text-accent">
                      <FaMapMarked size={20} />
                    </div>
                    <span className="font-bold text-gray-700">
                      Smart Mapping
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/10 p-3 rounded-full text-accent">
                      <FaHandshake size={20} />
                    </div>
                    <span className="font-bold text-gray-700">
                      Community Driven
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3: VISION & MISSION */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-dark-blue mb-4">
                Our Core Values
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The principles that drive us to build the best travel platform
                for you.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ScrollReveal>
              <div className="bg-white p-10 rounded-3xl shadow-xl border-t-4 border-accent hover:shadow-2xl transition-all duration-300 group">
                <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                  <FaLightbulb
                    size={35}
                    className="text-accent group-hover:text-white"
                  />
                </div>
                <h3 className="text-3xl font-bold text-dark-blue mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  "To visualize a world where travel is seamless, sustainable,
                  and accessible to everyone, becoming the number one AI-powered
                  travel companion in Asia."
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-white p-10 rounded-3xl shadow-xl border-t-4 border-green-500 hover:shadow-2xl transition-all duration-300 group">
                <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <FaRocket
                    size={35}
                    className="text-green-600 group-hover:text-white"
                  />
                </div>
                <h3 className="text-3xl font-bold text-dark-blue mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  "To empower travelers with smart tools and authentic local
                  knowledge, fostering a community that celebrates the beauty
                  and culture of Sri Lanka."
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHAT WE OFFER (Features with Images) */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2 order-2 lg:order-1">
                <h3 className="text-accent font-bold uppercase tracking-widest mb-2">
                  Why Choose Us?
                </h3>
                <h2 className="text-4xl font-bold text-dark-blue mb-6">
                  Experience Travel Like Never Before
                </h2>

                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="mt-1">
                      <FaGlobeAsia className="text-accent text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">
                        Comprehensive Database
                      </h4>
                      <p className="text-gray-600 mt-2">
                        Access hundreds of verified locations with up-to-date
                        information, ticket prices, and travel tips.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1">
                      <FaUsers className="text-accent text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">
                        Community Reviews
                      </h4>
                      <p className="text-gray-600 mt-2">
                        Make informed decisions based on real reviews and
                        ratings from fellow travelers.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1">
                      <FaAward className="text-accent text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">
                        Top-Rated Destinations
                      </h4>
                      <p className="text-gray-600 mt-2">
                        Our AI algorithm highlights trending and highly-rated
                        spots so you never miss out.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 order-1 lg:order-2">
                <div className="relative">
                  <img
                    src="/about2.jpg"
                    alt="Features"
                    className="rounded-3xl shadow-2xl w-full object-cover h-125"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 5: LIVE STATS  */}
      <section className="py-16 bg-dark-blue text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="w-96 h-96 bg-accent rounded-full blur-3xl absolute -top-20 -left-20"></div>
          <div className="w-96 h-96 bg-accent rounded-full blur-3xl absolute -bottom-20 -right-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
              <div className="p-4">
                <FaUsers className="text-5xl text-accent mx-auto mb-4" />
                <h3 className="text-5xl font-bold mb-2">{stats.users}</h3>
                <p className="text-gray-300 uppercase tracking-wider text-sm">
                  Active Users
                </p>
              </div>

              <div className="p-4">
                <FaGlobeAsia className="text-5xl text-accent mx-auto mb-4" />
                <h3 className="text-5xl font-bold mb-2">{stats.places}</h3>
                <p className="text-gray-300 uppercase tracking-wider text-sm">
                  Destinations
                </p>
              </div>

              <div className="p-4">
                <FaAward className="text-5xl text-accent mx-auto mb-4" />
                <h3 className="text-5xl font-bold mb-2">#1</h3>
                <p className="text-gray-300 uppercase tracking-wider text-sm">
                  Travel Choice
                </p>
              </div>

              <div className="p-4">
                <FaSmile className="text-5xl text-accent mx-auto mb-4" />
                <h3 className="text-5xl font-bold mb-2">100%</h3>
                <p className="text-gray-300 uppercase tracking-wider text-sm">
                  Satisfaction
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 6: CTA */}
      <section className="py-24 px-4 bg-white text-center">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-dark-blue mb-6">
              Ready to Explore Sri Lanka?
            </h2>
            <p className="text-gray-600 text-xl mb-10 max-w-2xl mx-auto">
              Join our community today and start planning your next great
              adventure with TravelMate.
            </p>
            <Link
              to="/places"
              className="inline-block bg-accent hover:bg-sky-500 text-white px-12 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-accent/40 transition-all transform hover:scale-105"
            >
              Start Exploring Now
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
