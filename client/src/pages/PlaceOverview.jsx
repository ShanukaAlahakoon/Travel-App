import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaTag,
  FaMoneyBillWave,
  FaArrowLeft,
} from "react-icons/fa";

export default function PlaceOverview() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/places/" + id)
      .then((res) => {
        setPlace(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="text-center mt-20 text-gray-600">Place not found!</div>
    );
  }

  return (
    <div className="max-w-300 mx-auto px-4 py-10">
      {/* Back Button */}
      <Link
        to="/places"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-accent mb-6 transition-colors font-medium"
      >
        <FaArrowLeft /> Back to Places
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Side: Images */}
        <div className="space-y-4">
          <div className="h-100 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <img
              src={
                place.images?.[0] ||
                place.image ||
                "https://via.placeholder.com/600"
              }
              alt={place.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {place.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-dark-blue mb-4">
            {place.name}
          </h1>

          <div className="flex items-center gap-2 text-gray-500 text-lg mb-6">
            <FaMapMarkerAlt className="text-accent" />
            <span>{place.location}</span>
          </div>

          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <h3 className="text-lg font-bold text-dark-blue mb-2">
              About this destination
            </h3>
            <p className="text-gray-600 leading-relaxed">{place.description}</p>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-gray-700 font-bold text-xl">
              <FaMoneyBillWave className="text-green-600" />
              <span>
                {place.ticketPrice > 0
                  ? `LKR ${place.ticketPrice}`
                  : "Free Entry"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 bg-dark-blue hover:bg-accent text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-accent/30">
              Add to Trip Plan
            </button>
            {place.coordinates && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${place.coordinates.lat},${place.coordinates.lng}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-4 border-2 border-dark-blue text-dark-blue rounded-xl font-bold hover:bg-dark-blue hover:text-white transition-all"
              >
                View on Map
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
