import { useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaMapMarkerAlt,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import uploadFile from "../../utils/mediaUpload.js";

const containerStyle = { width: "100%", height: "350px" };
const center = { lat: 7.8731, lng: 80.7718 };

export default function AdminAddPlace() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [formData, setFormData] = useState({
    name: "",
    category: "Historical",
    location: "",
    description: "",
    ticketPrice: 0,
    lat: 7.8731,
    lng: 80.7718,
  });

  const onMapClick = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Submit Function ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem("token");

    try {
      const imagesPromises = [];
      for (let i = 0; i < files.length; i++) {
        imagesPromises.push(uploadFile(files[i]));
      }
      const uploadedImageUrls = await Promise.all(imagesPromises);

      const finalData = {
        name: formData.name,
        description: formData.description,
        images: uploadedImageUrls,
        category: formData.category,
        location: formData.location,
        ticketPrice: Number(formData.ticketPrice),
        coordinates: {
          lat: formData.lat,
          lng: formData.lng,
        },
      };

      // send to backend
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/places/add",
        finalData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Place added successfully!");
      navigate("/admin/places");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add place. Check logs.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-10 px-4">
      <div className="flex items-center gap-4 mb-6 pt-5">
        <button
          onClick={() => navigate("/admin/places")}
          className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-all text-gray-600"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          Add New Destination
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1 uppercase tracking-wider">
              Place Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1 uppercase tracking-wider">
              City / General Location
            </label>
            <input
              type="text"
              name="location"
              onChange={handleChange}
              required
              placeholder="e.g. Kandy"
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1 uppercase tracking-wider">
                Category
              </label>
              <select
                name="category"
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none"
              >
                <option value="Historical">Historical</option>
                <option value="Nature">Nature</option>
                <option value="Beach">Beach</option>
                <option value="Wildlife">Wildlife</option>
                <option value="Religious">Religious</option>
                <option value="Adventure">Adventure</option>
                <option value="Cultural">Cultural</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1 uppercase tracking-wider">
                Ticket Price
              </label>
              <input
                type="number"
                name="ticketPrice"
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-xl outline-none"
              />
            </div>
          </div>

          {/* --- Image Upload Input --- */}
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1 uppercase tracking-wider  items-center gap-2">
              <FaCloudUploadAlt /> Upload Images
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="w-full p-2 border border-dashed border-accent/40 rounded-xl cursor-pointer hover:bg-slate-50 transition-all"
              accept="image/*"
            />
            <p className="text-[10px] text-gray-400 mt-1">
              Select one or more photos of the location.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1 uppercase tracking-wider">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-xl outline-none"
            ></textarea>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
          <label className="block text-sm font-bold text-gray-600 mb-3 uppercase tracking-wider">
            Mark Location
          </label>
          <div className="flex-1 rounded-2xl overflow-hidden border border-gray-200 min-h-87.5">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={7}
                onClick={onMapClick}
              >
                <Marker position={{ lat: formData.lat, lng: formData.lng }} />
              </GoogleMap>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                Loading Map...
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !isLoaded}
            className="w-full mt-6 bg-accent text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-sky-600 transition-all shadow-lg"
          >
            {isLoading ? (
              "Uploading & Saving..."
            ) : (
              <>
                <FaSave /> Save Destination
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
