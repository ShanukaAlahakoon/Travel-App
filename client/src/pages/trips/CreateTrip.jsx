import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaTrashAlt,
  FaMagic,
  FaRegSave,
  FaSuitcaseRolling,
  FaMapMarkerAlt,
  FaClock,
  FaLocationArrow,
} from "react-icons/fa";
import { getTripPlan, removeFromTripPlan } from "../../utils/tripUtils.js";
import PlaceCard from "../../components/PlaceCard";

export default function CreateTrip() {
  const [localPlaces, setLocalPlaces] = useState([]);
  const [tempAIPlan, setTempAIPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSavingDB, setIsSavingDB] = useState(false);

  const [formData, setFormData] = useState({
    days: 1,
    vehicle: "Car",
    peopleCount: 1,
    startDate: "",
    startTime: "08:00",
    startLocation: "",
  });

  const loadPlaces = () => {
    const savedPlaces = getTripPlan();
    setLocalPlaces(savedPlaces);
  };

  useEffect(() => {
    loadPlaces();
  }, []);

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      toast.loading("Fetching location...", { id: "geo" });
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({ ...formData, startLocation: "My Current Location" });
          toast.success("Location set to current!", { id: "geo" });
        },
        () => toast.error("Location access denied.", { id: "geo" })
      );
    } else {
      toast.error("Geolocation not supported.");
    }
  };

  const handleRemovePlace = (placeId) => {
    removeFromTripPlan(placeId);
    loadPlaces();
    setTempAIPlan(null);
  };

  const handleGeneratePlan = async () => {
    if (localPlaces.length === 0)
      return toast.error("Please add some places first!");
    if (!formData.startDate || !formData.startLocation)
      return toast.error("Fill location and date!");

    setIsGenerating(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/trips/generate`,
        {
          selectedPlaces: localPlaces,
          ...formData,
        }
      );
      setTempAIPlan(res.data.aiPlan);
      toast.success("AI Itinerary Generated!");
    } catch (err) {
      toast.error("AI Generation failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFinalSave = async () => {
    const userString = localStorage.getItem("user");
    if (!userString) return toast.error("Please login first!");

    const user = JSON.parse(userString);
    setIsSavingDB(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/trips/save-final`, {
        userId: user._id || user.id,
        selectedPlaces: localPlaces,
        ...formData,
        aiPlan: tempAIPlan,
      });
      toast.success("Trip saved successfully! ✅");
      setTempAIPlan(null);
    } catch (err) {
      toast.error("Failed to save trip.");
    } finally {
      setIsSavingDB(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 text-center sm:text-left">
        <div className="p-4 bg-accent/10 rounded-2xl text-accent">
          <FaSuitcaseRolling size={30} />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-dark-blue">
            Plan Your Journey
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Customize your trip and let AI do the magic.
          </p>
        </div>
      </div>

      {/* Selected Places List */}
      <div className="mb-10 text-center sm:text-left">
        <h3 className="text-lg font-bold text-gray-500 mb-6 flex items-center justify-center sm:justify-start gap-2">
          Selected Destinations
          <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
            {localPlaces.length}
          </span>
        </h3>
        {localPlaces.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {localPlaces.map((place) => (
              <div key={place._id} className="relative group">
                <button
                  onClick={() => handleRemovePlace(place._id)}
                  className="absolute top-3 right-3 z-10 bg-red-500 text-white p-2 rounded-xl shadow-lg sm:opacity-0 group-hover:opacity-100 transition-all"
                >
                  <FaTrashAlt size={14} />
                </button>
                <PlaceCard place={place} />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center bg-white rounded-4xl border-2 border-dashed border-gray-100">
            <p className="text-gray-400">No places added yet.</p>
          </div>
        )}
      </div>

      {/* Settings Form */}
      <div className="bg-white p-6 md:p-10 rounded-4xl shadow-2xl border border-blue-50 mb-10">
        <h3 className="text-xl md:text-2xl font-black text-dark-blue mb-8">
          Trip Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2 lg:col-span-2">
            <label className="text-xs font-black text-gray-400 uppercase flex justify-between items-center">
              Start Location
              <button
                onClick={handleUseCurrentLocation}
                className="text-accent flex items-center gap-1 normal-case hover:underline"
              >
                <FaLocationArrow size={10} /> Use Current
              </button>
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                type="text"
                placeholder="Where do you start?"
                className="w-full p-4 pl-12 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-accent/20 font-bold"
                value={formData.startLocation}
                onChange={(e) =>
                  setFormData({ ...formData, startLocation: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase">
              Start Time
            </label>
            <div className="relative">
              <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                type="time"
                className="w-full p-4 pl-12 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-accent/20 font-bold"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase">
              Days
            </label>
            <input
              type="number"
              min="1"
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold"
              value={formData.days}
              onChange={(e) =>
                setFormData({ ...formData, days: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase">
              Transport
            </label>
            <select
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold"
              value={formData.vehicle}
              onChange={(e) =>
                setFormData({ ...formData, vehicle: e.target.value })
              }
            >
              <option>Car</option>
              <option>Van</option>
              <option>Bus</option>
              <option>Tuk Tuk</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase">
              Start Date
            </label>
            <input
              type="date"
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
            />
          </div>
        </div>
        <button
          onClick={handleGeneratePlan}
          disabled={isGenerating}
          className="w-full bg-dark-blue hover:bg-accent text-white py-5 rounded-2xl font-black mt-10 shadow-xl transition-all flex items-center justify-center gap-3"
        >
          {isGenerating ? (
            "AI is Thinking..."
          ) : (
            <>
              <FaMagic /> Generate AI Itinerary ✨
            </>
          )}
        </button>
      </div>

      {/* Review Section */}
      {tempAIPlan && (
        <div className="animate-slide-up">
          <div className="mb-8 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-dark-blue">
              Review Your Schedule
            </h3>
            <p className="text-gray-500 text-sm">
              Review the plan and save it to your profile.
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            {tempAIPlan.map((day, idx) => (
              <div
                key={idx}
                className="bg-white p-6 md:p-8 rounded-3xl md:rounded-3xl shadow-xl border border-blue-50 relative group transition-all"
              >
                <div className="sm:absolute top-0 right-0 bg-accent text-white px-6 py-2 rounded-xl sm:rounded-bl-4xl font-black text-[10px] md:text-sm mb-4 sm:mb-0 w-fit">
                  DAY {day.day}
                </div>
                <h4 className="text-xl md:text-2xl font-black text-dark-blue mb-6 pr-0 sm:pr-24">
                  {day.title}
                </h4>
                <ul className="space-y-4 mb-6">
                  {(Array.isArray(day.activities)
                    ? day.activities
                    : String(day.activities || "").split(";")
                  ).map((activity, i) => {
                    if (!activity) return null;
                    const activityStr =
                      typeof activity === "string"
                        ? activity
                        : JSON.stringify(activity);
                    const parts = activityStr.split(" - ");
                    const time = parts.length > 1 ? parts[0] : "";
                    const action = parts.length > 1 ? parts[1] : activityStr;
                    return (
                      <li
                        key={i}
                        className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-slate-50 p-4 rounded-2xl"
                      >
                        {time && (
                          <span className="text-accent font-black text-xs bg-white px-3 py-1 rounded-lg border border-accent/10 w-fit">
                            {time.trim()}
                          </span>
                        )}
                        <span className="font-bold text-gray-700 text-sm md:text-base leading-tight">
                          {action.trim()}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="bg-slate-50 p-4 rounded-2xl italic text-gray-500 text-xs md:text-sm">
                  <span className="text-accent font-black not-italic mr-2">
                    💡 LOCAL TIP:
                  </span>
                  {day.description}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons at the Bottom */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleGeneratePlan}
              disabled={isGenerating}
              className="w-full sm:w-auto bg-dark-blue text-white px-10 py-4 rounded-2xl font-black shadow-xl flex items-center justify-center gap-3 transition-all hover:bg-accent"
            >
              {isGenerating ? (
                "AI is Thinking..."
              ) : (
                <>
                  <FaMagic /> Regenerate Plan
                </>
              )}
            </button>
            <button
              onClick={handleFinalSave}
              disabled={isSavingDB}
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl flex items-center justify-center gap-3 transition-all transform hover:scale-105"
            >
              {isSavingDB ? (
                "Saving..."
              ) : (
                <>
                  <FaRegSave size={20} /> Save Plan
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
