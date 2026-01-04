import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaMapMarkerAlt,
  FaCloudUploadAlt,
  FaTrash,
} from "react-icons/fa";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import uploadFile from "../../utils/mediaUpload.js";

const containerStyle = { width: "100%", height: "350px" };

export default function AdminUpdatePlace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [files, setFiles] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    description: "",
    ticketPrice: 0,
    images: [],
    lat: 7.8731,
    lng: 80.7718,
  });

  // get current details of the place
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/places/${id}`)
      .then((res) => {
        const place = res.data;
        setFormData({
          name: place.name,
          category: place.category,
          location: place.location,
          description: place.description,
          ticketPrice: place.ticketPrice,
          images: place.images || [],
          lat: place.coordinates?.lat || 7.8731,
          lng: place.coordinates?.lng || 80.7718,
        });
        setIsFetching(false);
      })
      .catch((err) => {
        toast.error("Failed to load place details");
        navigate("/admin/places");
      });
  }, [id, navigate]);

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

  const removeExistingImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("token");

    try {
      let newImageUrls = [];
      if (files.length > 0) {
        const promises = Array.from(files).map((file) => uploadFile(file));
        newImageUrls = await Promise.all(promises);
      }

      const finalData = {
        ...formData,
        images: [...formData.images, ...newImageUrls],
        ticketPrice: Number(formData.ticketPrice),
        coordinates: { lat: formData.lat, lng: formData.lng },
      };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/places/update/${id}`,
        finalData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Place updated successfully!");
      navigate("/admin/places");
    } catch (error) {
      toast.error("Update failed!");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching)
    return <div className="p-10 text-center">Loading Data...</div>;

  return (
    <div className="w-full max-w-5xl mx-auto pb-10 px-4">
      <div className="flex items-center gap-4 mb-6 pt-5">
        <button
          onClick={() => navigate("/admin/places")}
          className="p-2 bg-white rounded-full shadow hover:bg-gray-100 text-gray-600"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Update Destination</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1 uppercase">
              Place Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1 uppercase">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl bg-white"
              >
                <option value="Historical">Historical</option>
                <option value="Nature">Nature</option>
                <option value="Beach">Beach</option>
                <option value="Wildlife">Wildlife</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1 uppercase">
                Ticket Price
              </label>
              <input
                type="number"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1 uppercase">
              City / Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl outline-none"
            />
          </div>

          {/* image Preview */}
          <div className="flex gap-2 overflow-x-auto py-2">
            {formData.images.map((url, idx) => (
              <div key={idx} className="relative w-20 h-20 shrink-0">
                <img
                  src={url}
                  className="w-full h-full object-cover rounded-lg border"
                  alt="place"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(idx)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full text-[10px]"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1 uppercase  items-center gap-2">
              <FaCloudUploadAlt /> Add New Images
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="w-full p-2 border border-dashed rounded-xl"
              accept="image/*"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1 uppercase">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl outline-none"
            ></textarea>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
          <label className="block text-sm font-bold text-gray-600 mb-3 uppercase">
            Update Map Location
          </label>
          <div className="flex-1 rounded-2xl overflow-hidden border border-gray-200 min-h-87.5">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: formData.lat, lng: formData.lng }}
                zoom={10}
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
            className="w-full mt-6 bg-accent text-white py-4 rounded-xl font-bold hover:bg-sky-600 transition-all shadow-lg"
          >
            {isLoading ? (
              "Updating..."
            ) : (
              <>
                <FaSave /> Update Destination
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
