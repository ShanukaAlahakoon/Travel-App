import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import PlaceCard from "../components/PlaceCard";
import { FaFilter, FaSearch } from "react-icons/fa";

export default function Places() {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const districts = [
    "Colombo",
    "Gampaha",
    "Kalutara",
    "Matale",
    "Kandy",
    "Nuwara Eliya",
    "Kegalle",
    "Ratnapura",
    "Jaffna",
    "Kilinochchi",
    "Mannar",
    "Vavuniya",
    "Mullaitivu",
    "Batticaloa",
    "Ampara",
    "Trincomalee",
    "Polonnaruwa",
    "Anuradhapura",
    "Puttalam",
    "Kurunegala",
    "Badulla",
    "Monaragala",
    "Hambantota",
    "Galle",
    "Matara",
  ];
  const categories = [
    "Historical",
    "Nature",
    "Beach",
    "Wildlife",
    "Religious",
    "Adventure",
  ];

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/places")
      .then((res) => {
        setPlaces(res.data.list || res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to load places.");
        setIsLoading(false);
      });
  }, []);

  // --- Filtering & Searching Logic ---
  const filteredPlaces = places.filter((place) => {
    const categoryMatch =
      selectedCategory === "All" || place.category === selectedCategory;
    const districtMatch =
      selectedDistrict === "All" ||
      (place.location &&
        place.location.toLowerCase().includes(selectedDistrict.toLowerCase()));

    const searchMatch = place.name
      .toLowerCase()
      .startsWith(searchTerm.toLowerCase());

    return categoryMatch && districtMatch && searchMatch;
  });

  return (
    <div className="max-w-300 mx-auto px-4 py-20 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-dark-blue mb-4">
          Explore <span className="text-accent">Destinations</span>
        </h1>
      </div>

      {/* --- Filter & Search Bar --- */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-gray-400 font-bold mr-2">
            <FaFilter className="text-accent" /> <span>Filter:</span>
          </div>

          <select
            className="p-3 border rounded-xl bg-slate-50 outline-none text-sm min-w-40"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            className="p-3 border rounded-xl bg-slate-50 outline-none text-sm min-w-40"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="All">All Districts</option>
            {districts.map((dis) => (
              <option key={dis} value={dis}>
                {dis}
              </option>
            ))}
          </select>
        </div>

        {/* --- Search Input Field --- */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-accent/20 transition-all"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredPlaces.length > 0 ? (
          filteredPlaces.map((place) => (
            <PlaceCard key={place._id} place={place} />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-400 italic">
            No destinations found.
          </div>
        )}
      </div>
    </div>
  );
}
