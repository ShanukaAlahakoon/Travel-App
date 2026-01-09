import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaArrowLeft,
  FaRoute,
  FaCar,
  FaWalking,
  FaBicycle,
  FaClock,
  FaRulerHorizontal,
} from "react-icons/fa";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import ImageSlider from "../components/ImageSlider.jsx";
import ReviewSlider from "../components/ReviewSlider.jsx";
import AddReview from "../components/AddReview.jsx";
import { addToTripPlan } from "../utils/tripUtils.js";

const containerStyle = { width: "100%", height: "500px" };

export default function PlaceOverview() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [reviews, setReviews] = useState([]);

  // States for Directions
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [travelMode, setTravelMode] = useState("DRIVING");
  const [routeData, setRouteData] = useState({ distance: "", duration: "" });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const fetchReviews = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/reviews/${id}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.log("Error fetching reviews:", err));
  };

  useEffect(() => {
    // Fetch Place Details
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/places/" + id)
      .then((res) => {
        setPlace(res.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));

    fetchReviews();

    // Get User Current Location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setCurrentLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        () => console.log("Location access denied"),
        { enableHighAccuracy: true }
      );
    }
  }, [id]);

  // Programmatic Directions Fetching
  useEffect(() => {
    if (isLoaded && currentLocation && place?.coordinates) {
      const service = new window.google.maps.DirectionsService();

      service.route(
        {
          origin: currentLocation,
          destination: {
            lat: Number(place.coordinates.lat),
            lng: Number(place.coordinates.lng),
          },
          travelMode: travelMode,
        },
        (result, status) => {
          if (status === "OK") {
            setDirectionsResponse(result);
            setRouteData({
              distance: result.routes[0].legs[0].distance.text,
              duration: result.routes[0].legs[0].duration.text,
            });
          } else {
            setDirectionsResponse(null);
            setRouteData({ distance: "", duration: "" });
            if (travelMode === "BICYCLING") {
              toast.error("Cycling directions are not available here.");
            }
          }
        }
      );
    }
  }, [isLoaded, currentLocation, place, travelMode]);

  const handleModeChange = (mode) => {
    setDirectionsResponse(null);
    setTravelMode(mode);
  };

  const handleAddToTrip = () => {
    const user = localStorage.getItem("user");
    if (!user) return toast.error("Please login first to plan your trip!");

    addToTripPlan(place);
  };

  if (isLoading || !isLoaded)
    return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link
        to="/places"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-accent mb-6 font-medium"
      >
        <FaArrowLeft /> Back to Places
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        <div className="h-80 md:h-110 rounded-3xl overflow-hidden shadow-xl border">
          <ImageSlider
            images={place.images?.length > 0 ? place.images : [place.image]}
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-black uppercase mb-4 w-fit tracking-widest">
            {place.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-dark-blue mb-4">
            {place.name}
          </h1>
          <div className="flex items-center gap-2 text-gray-500 mb-6">
            <FaMapMarkerAlt className="text-red-500" /> {place.location}
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-gray-100 text-gray-600 leading-relaxed">
            {place.description}
          </div>
          <button
            onClick={handleAddToTrip}
            className="w-full bg-dark-blue hover:bg-accent text-white py-5 rounded-2xl font-bold shadow-xl transition-all"
          >
            Add to Trip Plan
          </button>
        </div>
      </div>

      {place.coordinates && (
        <div className="relative rounded-[2.5rem] overflow-hidden border shadow-2xl group mb-20">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={
              currentLocation || {
                lat: Number(place.coordinates.lat),
                lng: Number(place.coordinates.lng),
              }
            }
            zoom={13}
            options={{ disableDefaultUI: true, zoomControl: true }}
          >
            {directionsResponse && (
              <DirectionsRenderer
                options={{
                  directions: directionsResponse,
                  polylineOptions: { strokeColor: "#0ea5e9", strokeWeight: 6 },
                }}
              />
            )}
            {!directionsResponse && (
              <Marker
                position={{
                  lat: Number(place.coordinates.lat),
                  lng: Number(place.coordinates.lng),
                }}
              />
            )}
          </GoogleMap>

          <div className="absolute top-5 right-5 flex bg-white/90 backdrop-blur-md p-1 rounded-2xl shadow-xl z-10 border border-white/40">
            {["DRIVING", "WALKING", "BICYCLING"].map((mode) => (
              <button
                key={mode}
                onClick={() => handleModeChange(mode)}
                className={`p-3 rounded-xl transition-all ${
                  travelMode === mode
                    ? "bg-accent text-white shadow-lg"
                    : "text-gray-400 hover:bg-gray-50"
                }`}
              >
                {mode === "DRIVING" ? (
                  <FaCar size={18} />
                ) : mode === "WALKING" ? (
                  <FaWalking size={18} />
                ) : (
                  <FaBicycle size={18} />
                )}
              </button>
            ))}
          </div>

          {routeData.distance && (
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 px-6 rounded-3xl shadow-2xl z-10 border border-white/40 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-500/10 rounded-xl">
                  <FaRulerHorizontal className="text-blue-600" size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase">
                    Distance
                  </p>
                  <p className="text-sm font-black text-dark-blue">
                    {routeData.distance}
                  </p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-green-500/10 rounded-xl">
                  <FaClock className="text-green-600" size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase">
                    Duration
                  </p>
                  <p className="text-sm font-black text-dark-blue">
                    {routeData.duration}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Traveler Reviews Section */}
      <section className="mb-20">
        <h2 className="text-2xl font-black text-dark-blue mb-8">
          Traveler Reviews
        </h2>
        {reviews.length > 0 ? (
          <ReviewSlider reviews={reviews} />
        ) : (
          <div className="bg-gray-50 p-10 rounded-[2.5rem] text-center border border-dashed">
            <p className="text-gray-400">
              No reviews yet for this place. Be the first!
            </p>
          </div>
        )}
      </section>

      <AddReview placeId={id} onReviewAdded={fetchReviews} />
    </div>
  );
}
