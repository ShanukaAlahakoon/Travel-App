import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  FaMapMarkedAlt,
  FaUsers,
  FaStar,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

import AdminDashboard from "./admin/AdminDashboard";
import AdminPlaces from "./admin/AdminPlaces";
import AdminUsers from "./admin/AdminUsers";
import AdminReviews from "./admin/AdminReviews";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token == null) {
      window.location.href = "/login";
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("User details:", response.data);

        if (response.data.role === "admin") {
          setUser(response.data);
        } else {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        window.location.href = "/login";
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="w-full h-screen flex bg-gray-100 overflow-hidden">
      {user ? (
        <>
          {/* --- SIDEBAR --- */}
          <div className="w-75 bg-dark-blue h-full flex flex-col shadow-2xl z-20 shrink-0">
            {/* Logo Area */}
            <div className="h-25 flex items-center justify-center border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="bg-white p-0.5 rounded-full group-hover:bg-accent/20 transition-all border border-white/10">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-8 h-8 md:w-10 md:h-10 object-contain"
                  />
                </div>
                <h1 className="text-2xl font-bold text-white tracking-wide">
                  Travel<span className="text-accent">Mate</span>
                </h1>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 py-6 flex flex-col pl-5 pt-5 space-y-2 overflow-y-auto">
              <Link
                to="/admin"
                className="w-full flex items-center h-12.5 gap-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-l-xl transition-all pl-4"
              >
                <FaTachometerAlt size={20} />{" "}
                <span className="text-lg font-medium">Dashboard</span>
              </Link>

              <Link
                to="/admin/places"
                className="w-full flex items-center h-12.5 gap-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-l-xl transition-all pl-4"
              >
                <FaMapMarkedAlt size={20} />{" "}
                <span className="text-lg font-medium">Places</span>
              </Link>

              <Link
                to="/admin/users"
                className="w-full flex items-center h-12.5 gap-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-l-xl transition-all pl-4"
              >
                <FaUsers size={20} />{" "}
                <span className="text-lg font-medium">Users</span>
              </Link>

              <Link
                to="/admin/reviews"
                className="w-full flex items-center h-12.5 gap-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-l-xl transition-all pl-4"
              >
                <FaStar size={20} />{" "}
                <span className="text-lg font-medium">Reviews</span>
              </Link>
            </div>

            {/* Logout Button */}
            <div className="p-6 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-500/20 text-red-400 hover:bg-red-600 hover:text-white py-3 rounded-xl transition-all font-bold"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>

          {/* --- CONTENT AREA (Routes) --- */}
          <div className="w-[calc(100%-300px)] h-full max-h-full bg-slate-100 overflow-y-auto p-8">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/places" element={<AdminPlaces />} />
              <Route path="/users" element={<AdminUsers />} />
              <Route path="/reviews" element={<AdminReviews />} />
              <Route
                path="*"
                element={
                  <h1 className="text-2xl text-gray-600">Page Not Found</h1>
                }
              />
            </Routes>
          </div>
        </>
      ) : (
        /* --- LOADER --- */
        <div className="flex justify-center items-center w-full h-full bg-dark-blue">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
