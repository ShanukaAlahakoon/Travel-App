import { useEffect, useState } from "react";
import axios from "axios";
import PlaceCard from "../components/PlaceCard";

export default function MyPlan() {
  const [trip, setTrip] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/trips/my-plan`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTrip(res.data));
  }, []);

  const generateAIItinerary = async () => {
    console.log("Generating with Gemini...");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-black text-dark-blue mb-10">My Trip Plan</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {trip?.selectedPlaces.map((place) => (
          <PlaceCard key={place._id} place={place} />
        ))}
      </div>

      {trip?.selectedPlaces.length > 0 && (
        <div className="text-center">
          <button
            onClick={generateAIItinerary}
            className="bg-accent text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:bg-sky-600 transition-all"
          >
            Generate AI Itinerary ✨
          </button>
        </div>
      )}
    </div>
  );
}
