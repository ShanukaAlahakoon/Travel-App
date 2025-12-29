import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

export default function UserData() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="flex items-center">
      {user ? (
        <div className="flex flex-row items-center gap-3 border border-white/20 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm">
          {user.image ? (
            <img
              src={user.image}
              className="w-8 h-8 rounded-full object-cover border border-accent"
              alt="User"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent border border-accent/50">
              <FaUser className="text-sm" />
            </div>
          )}

          {/* Dropdown Select */}
          <select
            className="bg-transparent outline-none text-white font-medium cursor-pointer text-sm max-w-30"
            onChange={(e) => {
              if (e.target.value === "logout") {
                handleLogout();
              } else if (e.target.value === "profile") {
              }
              e.target.value = "user";
            }}
          >
            <option className="bg-dark-blue text-white" value="user">
              {user.firstName}
            </option>

            <option className="bg-dark-blue text-red-400" value="logout">
              Logout
            </option>
          </select>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2 bg-accent text-white rounded-full text-sm font-bold hover:bg-sky-500 transition-all shadow-lg shadow-accent/20"
          >
            Login
          </Link>
          <span className="text-gray-500 hidden md:block">|</span>
          <Link
            to="/register"
            className="px-5 py-2 border border-accent text-accent rounded-full text-sm font-bold hover:bg-accent hover:text-white transition-all hidden md:block"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
