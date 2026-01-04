import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminPlaces() {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlaces = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/places")
      .then((res) => {
        setPlaces(res.data.list || res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this place?")) {
      const token = localStorage.getItem("token");
      axios
        .delete(import.meta.env.VITE_BACKEND_URL + "/places/delete/" + id, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          toast.success("Place deleted successfully");
          fetchPlaces();
        })
        .catch(() => {
          toast.error("Failed to delete place");
        });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-dark-blue">Manage Places</h2>
        <Link
          to="/admin/add-place"
          className="bg-accent hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition-all shadow-md"
        >
          <FaPlus /> Add New Place
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
              <tr>
                <th className="p-4 border-b">Image</th>
                <th className="p-4 border-b">Name</th>
                <th className="p-4 border-b">Category</th>
                <th className="p-4 border-b">Location</th>
                <th className="p-4 border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {places.map((place) => (
                <tr
                  key={place._id}
                  className="hover:bg-gray-50 border-b last:border-b-0 transition-colors"
                >
                  <td className="p-4">
                    <img
                      src={
                        place.images?.[0] ||
                        place.image ||
                        "https://via.placeholder.com/50"
                      }
                      alt={place.name}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                      referrerPolicy="no-referrer"
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-800">
                    {place.name}
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">
                      {place.category}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {place.location}
                  </td>

                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      {/* Edit Button */}
                      <Link
                        to={`/admin/places/update/${place._id}`}
                        className="bg-blue-50 text-blue-500 p-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                        title="Edit Place"
                      >
                        <FaEdit />
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(place._id)}
                        className="bg-red-50 text-red-500 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        title="Delete Place"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
