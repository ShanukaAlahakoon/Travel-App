import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function PlaceCard({ place }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group h-full flex flex-col">
      {/* Image Section */}
      <div className="relative h-50 overflow-hidden shrink-0">
        <img
          src={
            place.images?.[0] ||
            place.image ||
            "https://via.placeholder.com/300?text=No+Image"
          }
          alt={place.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-accent shadow-sm">
          {place.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-accent transition-colors line-clamp-1">
          {place.name}
        </h3>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <FaMapMarkerAlt className="text-accent" />
          <span className="line-clamp-1">{place.location}</span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 h-10 mb-4 overflow-hidden">
          {place.description}
        </p>

        <Link
          to={`/places/${place._id}`}
          className="mt-auto block w-full text-center bg-dark-blue text-white py-2 rounded-lg font-medium hover:bg-accent transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
