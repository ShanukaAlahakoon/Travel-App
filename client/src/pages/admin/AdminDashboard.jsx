import { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkedAlt, FaUsers, FaStar } from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    places: 0,
    users: 0,
    reviews: 0,
  });

  useEffect(() => {
    // 1. Places Count
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/places")
      .then((res) => {
        const count = res.data.list ? res.data.list.length : res.data.length;
        setStats((prev) => ({ ...prev, places: count }));
      })
      .catch((err) => console.error(err));

    // 2. Users Count
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/users/count")
      .then((res) => {
        setStats((prev) => ({ ...prev, users: res.data.count }));
      })
      .catch((err) => console.error(err));

    // 3. Reviews Count (Website Reviews)
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/reviews/website")
      .then((res) => {
        setStats((prev) => ({ ...prev, reviews: res.data.length }));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-dark-blue mb-8">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Places Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <FaMapMarkedAlt size={30} />
          </div>
          <div>
            <p className="text-gray-500 font-medium">Total Places</p>
            <h3 className="text-4xl font-bold text-dark-blue">
              {stats.places}
            </h3>
          </div>
        </div>

        {/* Users Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <FaUsers size={30} />
          </div>
          <div>
            <p className="text-gray-500 font-medium">Active Users</p>
            <h3 className="text-4xl font-bold text-dark-blue">{stats.users}</h3>
          </div>
        </div>

        {/* Reviews Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
            <FaStar size={30} />
          </div>
          <div>
            <p className="text-gray-500 font-medium">Total Reviews</p>
            <h3 className="text-4xl font-bold text-dark-blue">
              {stats.reviews}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
