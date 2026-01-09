import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaCalendarAlt,
  FaCar,
  FaUsers,
  FaChevronDown,
  FaChevronUp,
  FaMapMarkedAlt,
} from "react-icons/fa";

export default function MySavedTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      const userString = localStorage.getItem("user");
      if (!userString) return;
      const user = JSON.parse(userString);
      const userId = user._id || user.id;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/trips/my-saved-trips`,
          { params: { userId } }
        );
        setTrips(res.data);
      } catch (err) {
        toast.error("Failed to load journeys.");
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center font-bold text-gray-500 animate-pulse">
        Loading journeys...
      </div>
    );

  return (
    <div className="w-full max-w-6xl mx-auto p-3 sm:p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-12 text-center sm:text-left">
        <h2 className="text-2xl sm:text-4xl font-black text-dark-blue leading-tight">
          My Saved Journeys
        </h2>
        <p className="text-xs sm:text-base text-gray-500 mt-2">
          Relive your planned adventures.
        </p>
      </div>

      {trips.length === 0 ? (
        <div className="bg-white p-10 text-center rounded-4xl border shadow-sm">
          <p className="text-gray-400">No journeys saved yet.</p>
        </div>
      ) : (
        <div className="space-y-6 pb-20">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="bg-white rounded-3xl md:rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
            >
              {/* --- CARD HEADER --- */}
              <div className="p-4 sm:p-8">
                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-3 sm:gap-5">
                    <div className="w-12 h-12 sm:w-20 sm:h-20 bg-accent/10 rounded-xl sm:rounded-3xl flex items-center justify-center text-accent shrink-0">
                      <FaMapMarkedAlt className="text-xl sm:text-3xl" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-2xl font-black text-dark-blue wrap-break-words leading-snug">
                        {trip.title}
                      </h3>
                      <p className="text-[10px] sm:text-sm text-gray-400 font-medium mt-1">
                        Planned on{" "}
                        {new Date(trip.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg text-[10px] sm:text-sm font-bold text-gray-600 border border-gray-100">
                      <FaCalendarAlt className="text-accent" />{" "}
                      <span>{trip.days} Days</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg text-[10px] sm:text-sm font-bold text-gray-600 border border-gray-100 min-w-0">
                      <FaCar className="text-accent shrink-0" />{" "}
                      <span className="truncate">{trip.vehicle}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg text-[10px] sm:text-sm font-bold text-gray-600 border border-gray-100">
                      <FaUsers className="text-accent" />{" "}
                      <span>{trip.peopleCount} Pax</span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setExpandedId(expandedId === trip._id ? null : trip._id)
                    }
                    className="w-full flex justify-center items-center gap-2 bg-dark-blue text-white py-3.5 rounded-xl font-bold text-sm hover:bg-accent transition-all active:scale-95 shadow-md"
                  >
                    <span>
                      {expandedId === trip._id ? "Close" : "View Itinerary"}
                    </span>
                    {expandedId === trip._id ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>
                </div>
              </div>

              {/* --- EXPANDED DETAILS --- */}
              {expandedId === trip._id && (
                <div className="p-3 sm:p-8 border-t bg-slate-50/30 animate-fade-in">
                  <h4 className="text-lg font-black text-dark-blue mb-6">
                    Full Itinerary
                  </h4>

                  <div className="space-y-4 sm:space-y-6">
                    {Array.isArray(trip.aiPlan) &&
                      trip.aiPlan.map((day, idx) => (
                        <div
                          key={idx}
                          className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <span className="bg-accent text-white px-3 py-1 rounded-full text-[10px] font-black uppercase">
                              DAY {day.day || idx + 1}
                            </span>
                            <h5 className="font-black text-dark-blue text-sm sm:text-base leading-tight min-w-0 flex-1">
                              {day.title || day.Title}
                            </h5>
                          </div>

                          <ul className="space-y-3 mb-4">
                            {(Array.isArray(day.activities || day.Activities)
                              ? day.activities || day.Activities
                              : []
                            ).map((activity, i) => (
                              <li
                                key={i}
                                className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 bg-slate-50/70 p-3 rounded-xl border border-gray-50"
                              >
                                <span className="text-gray-700 text-xs sm:text-sm font-semibold wrap-break-words">
                                  {String(activity)}
                                </span>
                              </li>
                            ))}
                          </ul>

                          <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                            <p className="text-[10px] sm:text-xs text-gray-500 italic leading-relaxed">
                              💡 {day.description || day.Description}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
