import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer.jsx";
import Home from "./Home.jsx";
import Places from "./Places.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import PlaceOverview from "./PlaceOverview.jsx";
import TripPlanPage from "./trips/TripPlanPage.jsx";

export default function HomePage() {
  return (
    <div className="w-full h-screen flex flex-col bg-primary overflow-hidden">
      {" "}
      <div className="h-16 w-full shrink-0 z-50 relative">
        {" "}
        <Navbar />
      </div>
      <main className="flex-1 w-full overflow-hidden relative bg-slate-50">
        {" "}
        <Routes>
          <Route
            path="/"
            element={
              <div className="h-full overflow-y-auto">
                <Home />
                <Footer />
              </div>
            }
          />
          <Route
            path="/places"
            element={
              <div className="h-full overflow-y-auto">
                <Places />
                <Footer />
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div className="h-full overflow-y-auto">
                <About />
                <Footer />
              </div>
            }
          />
          <Route
            path="/contact"
            element={
              <div className="h-full overflow-y-auto">
                <Contact />
                <Footer />
              </div>
            }
          />
          <Route
            path="/places/:id"
            element={
              <div className="h-full overflow-y-auto">
                <PlaceOverview />
                <Footer />
              </div>
            }
          />

          <Route path="/trip-plan/*" element={<TripPlanPage />} />

          <Route
            path="/*"
            element={
              <h1 className="text-white text-center mt-20">
                404 - Page Not Found
              </h1>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
