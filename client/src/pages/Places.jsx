import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import PlaceCard from "../components/PlaceCard";

export default function Places() {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/places")
      .then((res) => {
        setPlaces(res.data.list || res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load places.");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="max-w-300 mx-auto px-4 py-20 min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-dark-blue mb-4">
          Explore <span className="text-accent">Destinations</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the hidden gems of Sri Lanka. From ancient ruins to pristine
          beaches, find your next adventure here.
        </p>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-50">
          <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Places Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {places.length > 0 ? (
              places.map((place) => <PlaceCard key={place._id} place={place} />)
            ) : (
              <div className="col-span-full text-center text-gray-500 py-10">
                <p>No places found.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
