import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import UserData from "./UserData.jsx";

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-dark-blue shadow-lg py-4 transition-all">
      <div className="max-w-400 mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-white p-2 rounded-full group-hover:bg-accent/20 transition-all border border-white/10">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-8 h-8 md:w-10 md:h-10 object-contain"
            />
          </div>
          <span className="text-2xl font-bold text-white tracking-wide">
            Travel<span className="text-accent">Mate</span>
          </span>
        </Link>

        {/* --- Desktop Menu --- */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: "Home", path: "/" },
            { name: "Places", path: "/places" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-base font-medium transition-all duration-300 relative group ${
                isActive(link.path)
                  ? "text-accent"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full ${
                  isActive(link.path) ? "w-full" : ""
                }`}
              ></span>
            </Link>
          ))}
        </div>

        {/* --- User Section & Mobile Toggle --- */}
        <div className="flex items-center gap-4">
          <UserData />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl focus:outline-none ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-dark-blue border-t border-white/10 shadow-2xl py-6 flex flex-col items-center gap-6 transition-all">
          <Link
            to="/"
            className="text-white text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/places"
            className="text-white text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Places
          </Link>
          <Link
            to="/about"
            className="text-white text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-white text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
