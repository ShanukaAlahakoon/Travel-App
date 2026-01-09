import { useState } from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import {
  FaBookmark,
  FaPlusCircle,
  FaBars,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import CreateTrip from "./CreateTrip.jsx";
import MySavedTrips from "./MySavedTrips.jsx";

export default function TripPlanPage() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path || location.pathname === path + "/";

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-50 relative overflow-hidden">
      {/* 1. MOBILE HEADER) */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
            <FaPlusCircle />
          </div>
          <span className="font-black text-dark-blue text-sm uppercase tracking-widest">
            Planner Menu
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-dark-blue bg-slate-50 rounded-xl active:scale-95 transition-all"
        >
          <FaBars size={18} />
        </button>
      </div>

      {/* 2. SIDEBAR BACKDROP  */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* 3. SIDEBAR  */}
      <aside
        className={`
          /* Position Logic */
          fixed md:static inset-y-0 left-0 z-70 md:mt-7
          /* Size Logic */
          w-72 md:w-64 h-full shrink-0
          /* Style Logic */
          bg-white border-r border-gray-100 flex flex-col
          /* Animation Logic */
          transition-transform duration-300 ease-in-out transform
          ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"} 
          md:translate-x-0
        `}
      >
        <div className="p-6 border-b md:hidden flex justify-between items-center bg-slate-50/50">
          <span className="font-black text-dark-blue uppercase text-xs tracking-widest">
            Navigation
          </span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 bg-white rounded-lg shadow-sm text-gray-400"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Menu Items Area */}
        <div className="flex-1 py-10 px-4 space-y-2 overflow-y-auto">
          <p className="hidden md:block text-[10px] font-black uppercase text-gray-400 px-4 mb-6 tracking-[0.2em]">
            Planner Menu
          </p>

          <Link
            to="/trip-plan"
            onClick={() => setIsSidebarOpen(false)}
            className={`w-full flex items-center h-14 gap-4 px-5 rounded-2xl font-bold transition-all ${
              isActive("/trip-plan")
                ? "bg-accent text-white shadow-lg shadow-accent/20"
                : "text-gray-500 hover:bg-slate-50 hover:text-dark-blue"
            }`}
          >
            <FaPlusCircle size={18} /> <span>Create Plan</span>
          </Link>

          <Link
            to="/trip-plan/saved"
            onClick={() => setIsSidebarOpen(false)}
            className={`w-full flex items-center h-14 gap-4 px-5 rounded-2xl font-bold transition-all ${
              isActive("/trip-plan/saved")
                ? "bg-accent text-white shadow-lg shadow-accent/20"
                : "text-gray-500 hover:bg-slate-50 hover:text-dark-blue"
            }`}
          >
            <FaBookmark size={18} /> <span>Saved Plans</span>
          </Link>

          {/* Home Link Section */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <Link
              to="/"
              className="flex items-center gap-3 px-5 text-sm text-gray-400 hover:text-accent font-bold transition-all group"
            >
              <FaArrowLeft
                size={12}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* 4. CONTENT AREA  */}
      <main className="flex-1 h-full overflow-y-auto custom-scrollbar bg-slate-50/50">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-10 pb-20 md:pb-10">
          <Routes>
            <Route path="/" element={<CreateTrip />} />
            <Route path="saved" element={<MySavedTrips />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
