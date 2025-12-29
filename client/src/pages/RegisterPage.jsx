import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Form clear on load
  useEffect(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, []);

  async function register() {
    // Validation
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/register", {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      toast.success("Registration successful! Please login.");
      navigate("/login");
      setIsLoading(false);
    } catch (error) {
      toast.error("Registration failed. Please check your details.");
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full h-screen relative overflow-hidden flex justify-center items-center">
      <div className="absolute inset-0 z-0">
        <img
          src="/bg.jpg"
          alt="Travel Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 w-full max-w-400 flex flex-col md:flex-row items-center justify-between px-4 md:px-20 h-full md:gap-40 overflow-y-auto md:overflow-hidden py-10 md:py-0">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0 shrink-0">
          <div className="bg-white/90 p-3 md:p-4 rounded-full shadow-lg mb-4 md:mb-6 backdrop-blur-sm">
            <img
              src="/logo.png"
              alt="TravelMate Logo"
              className="w-16 h-16 md:w-24 md:h-24 object-contain"
            />
          </div>

          <h1 className="text-4xl md:text-7xl font-bold text-white mb-2 md:mb-4 drop-shadow-xl">
            Travel<span className="text-accent">Mate</span>
          </h1>

          <p className="text-gray-200 text-lg md:text-3xl font-light italic mt-1 mb-4 md:mb-6 drop-shadow-md">
            "Plan Less. Explore More."
          </p>

          <p className="text-gray-300 text-sm md:text-xl leading-relaxed max-w-lg drop-shadow opacity-90 px-2 md:px-0 hidden md:block">
            Join our community today. Create an account to unlock exclusive
            travel plans.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end pb-10 md:pb-0">
          <div className="w-full max-w-120 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-6 md:p-10 transform transition-all hover:scale-[1.01]">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 text-center">
              Create Account
            </h2>
            <p className="text-gray-200 text-sm md:text-base text-center mb-6">
              Join us for a better journey
            </p>

            <form autoComplete="off">
              <div className="space-y-4">
                <div>
                  <label className="text-gray-100 text-xs font-bold uppercase ml-1 mb-1 block">
                    First Name
                  </label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    placeholder="Kamal"
                    autoComplete="off"
                    className="w-full h-12.5 rounded-xl bg-white/5 border border-white/10 px-4 text-white text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent transition-all shadow-inner"
                  />
                </div>

                <div>
                  <label className="text-gray-100 text-xs font-bold uppercase ml-1 mb-1 block">
                    Last Name
                  </label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    placeholder="Perera"
                    autoComplete="off"
                    className="w-full h-12.5 rounded-xl bg-white/5 border border-white/10 px-4 text-white text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent transition-all shadow-inner"
                  />
                </div>

                <div>
                  <label className="text-gray-100 text-xs font-bold uppercase ml-1 mb-1 block">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="name@example.com"
                    autoComplete="new-email"
                    className="w-full h-12.5 rounded-xl bg-white/5 border border-white/10 px-4 text-white text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent transition-all shadow-inner"
                  />
                </div>

                <div>
                  <label className="text-gray-100 text-xs font-bold uppercase ml-1 mb-1 block">
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="w-full h-12.5 rounded-xl bg-white/5 border border-white/10 px-4 text-white text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent transition-all shadow-inner"
                  />
                </div>

                <div>
                  <label className="text-gray-100 text-xs font-bold uppercase ml-1 mb-1 block">
                    Confirm Password
                  </label>
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="w-full h-12.5 rounded-xl bg-white/5 border border-white/10 px-4 text-white text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent transition-all shadow-inner"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={register}
                disabled={isLoading}
                className="w-full h-13.75 mt-6 bg-accent hover:bg-sky-500 text-white font-bold text-lg rounded-xl shadow-lg 
                transform transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
              >
                {isLoading ? "Creating..." : "Register"}
              </button>

              <div className="mt-6 text-center border-t border-white/20 pt-4">
                <p className="text-gray-200 text-sm md:text-base">
                  Already have an account?
                  <Link
                    to="/login"
                    className="text-accent font-bold ml-2 hover:text-white transition-colors"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          Loading...
        </div>
      )}
    </div>
  );
}
