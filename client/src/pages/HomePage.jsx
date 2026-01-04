import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer.jsx";
import Home from "./Home.jsx";
import Places from "./Places.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import PlaceOverview from "./PlaceOverview.jsx";
import MyPlan from "./MyPlan.jsx";

export default function HomePage() {
  return (
    <div className="w-full h-screen overflow-y-scroll overflow-x-hidden max-h-full bg-primary">
      <Navbar />

      <div className="w-full min-h-[calc(100vh-100px)] pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places" element={<Places />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/places/:id" element={<PlaceOverview />} />
          <Route path="/my-plan" element={<MyPlan />} />

          <Route
            path="/*"
            element={
              <h1 className="text-white text-center mt-20">
                404 - Page Not Found
              </h1>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
