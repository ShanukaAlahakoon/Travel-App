import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function login() {
    setIsLoading(true);
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/login",
        {
          email: email,
          password: password,
        }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.result));
      toast.success("Login successful!");

      if (res.data.result.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
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

      <div className="relative z-10 w-full max-w-400 flex flex-col md:flex-row items-center justify-between px-4 md:px-20 h-full gap-10 md:gap-40">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left mb-10 md:mb-0">
          <div className="bg-white/90 p-4 rounded-full shadow-lg mb-8 backdrop-blur-sm">
            <img
              src="/logo.png"
              alt="TravelMate Logo"
              className="w-20 h-20 md:w-24 md:h-24 object-contain"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-xl">
            Travel<span className="text-accent">Mate</span>
          </h1>

          <p className="text-gray-200 text-xl md:text-3xl font-light italic mt-1 mb-6 drop-shadow-md">
            "Plan Less. Explore More."
          </p>

          <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-lg drop-shadow opacity-90">
            Experience Sri Lanka like never before. Our AI-powered guide helps
            you discover hidden gems and plan perfect routes effortlessly.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="w-full max-w-120 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-10 md:p-14 transform transition-all hover:scale-[1.01]">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
              Welcome Back
            </h2>
            <p className="text-gray-200 text-base text-center mb-8">
              Sign in to continue your journey
            </p>

            <div className="space-y-6">
              <div>
                <label className="text-gray-100 text-sm font-bold uppercase ml-1 mb-2 block">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full h-15 rounded-xl bg-white/20 border border-white/10 px-5 text-white text-base placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                />
              </div>

              <div>
                <label className="text-gray-100 text-sm font-bold uppercase ml-1 mb-2 block">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-15 rounded-xl bg-white/10 border border-white/10 px-5 text-white text-base placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4 mb-8">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-200 hover:text-white hover:underline transition-colors font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              onClick={login}
              disabled={isLoading}
              className="w-full h-15 bg-accent hover:bg-sky-500 text-white font-bold text-xl rounded-xl shadow-lg 
              transform transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="mt-8 text-center border-t border-white/20 pt-6">
              <p className="text-gray-200 text-sm md:text-base">
                Don't have an account?
                <Link
                  to="/register"
                  className="text-accent font-bold ml-2 hover:text-white transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
