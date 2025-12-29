import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark-blue text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-300 mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Column 1: Branding */}
          <div>
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="bg-white p-2 rounded-full border border-white/10">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-2xl font-bold tracking-wide">
                Travel<span className="text-accent">Mate</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted AI companion for exploring the wonders of Sri Lanka.
              Plan less, explore more with TravelMate.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:pl-10">
            {" "}
            <h3 className="text-xl font-bold mb-6 text-white border-l-4 border-accent pl-3">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>{" "}
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/places"
                  className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>{" "}
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>{" "}
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>{" "}
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white border-l-4 border-accent pl-3">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <FaMapMarkerAlt className="text-accent mt-1" />
                <span>123, Galle Road, Colombo 03, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaPhoneAlt className="text-accent" />
                <span>+94 77 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaEnvelope className="text-accent" />
                <span>support@travelmate.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-white font-bold">TravelMate</span>. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
