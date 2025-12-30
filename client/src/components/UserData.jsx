import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
  FaUserCircle,
} from "react-icons/fa";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const getUserImage = () => {
    const img = user.profileImage || user.image;
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return `${import.meta.env.VITE_BACKEND_URL}/${img}`;
  };

  return (
    <div className="relative" ref={menuRef}>
      {user ? (
        <div className="relative">
          {/* --- TRIGGER BUTTON --- */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 border border-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all cursor-pointer outline-none"
          >
            {/* User Image */}
            <div className="w-8 h-8 rounded-full overflow-hidden border border-accent flex items-center justify-center bg-gray-800 shrink-0">
              {getUserImage() ? (
                <img
                  src={getUserImage()}
                  className="w-full h-full object-cover"
                  alt="User"
                  onError={(e) => (e.target.style.display = "none")}
                />
              ) : (
                <FaUser className="text-accent text-sm" />
              )}
            </div>

            <span className="text-white font-medium text-sm block truncate max-w-25 md:max-w-none">
              {user.firstName}
            </span>

            <FaChevronDown
              className={`text-gray-400 text-xs transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* --- DROPDOWN MENU --- */}
          {isOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-dark-blue border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in-down">
              {/* Menu Items */}
              <div className="py-2">
                {/* Profile Link */}
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUserCircle /> My Profile
                </Link>

                {/* Admin Dashboard Link (Only for Admins) */}
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUser /> Admin Panel
                  </Link>
                )}

                <div className="border-t border-white/10 my-1"></div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* --- LOGIN / REGISTER BUTTONS --- */
        <div className="flex flex-row items-center gap-3">
          <Link
            to="/login"
            className="px-6 py-2 bg-accent text-white rounded-full text-sm font-bold hover:bg-sky-500 transition-all shadow-lg shadow-accent/20"
          >
            Login
          </Link>
          <span className="text-gray-500 hidden md:block">|</span>
          <Link
            to="/register"
            className="px-6 py-2 border border-accent text-accent rounded-full text-sm font-bold hover:bg-accent hover:text-white transition-all hidden md:block"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
