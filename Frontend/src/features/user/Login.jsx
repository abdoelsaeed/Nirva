import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./authSlice";
import { login } from "../../services/userApi";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login(formData);
      // debug: log response shape

      const token = res?.token ?? res?.data?.token ?? null;
      const userObj = res?.user ?? res?.data?.user ?? res?.data ?? null;

      if (token) {
        // store token and set redux user
        try {
          localStorage.setItem("jwt", token);
        } catch (e) {
          console.warn("Could not persist jwt", e);
        }
        try {
          if (userObj) {
            dispatch(setUser(userObj));
          } else {
            console.warn(
              "Login succeeded but no user object returned to set in Redux",
              res
            );
          }
        } catch (e) {
          console.warn("Failed to dispatch setUser", e);
        }
        const from = location.state?.from?.pathname || "/";
        navigate(from);
      } else {
        setError("Login did not return a token");
      }
    } catch (err) {
      console.error("Login Error:", err);
      const message =
        err?.response?.data?.message || err?.message || "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Left side - Image */}
      <div className="w-full lg:w-1/2 h-[400px] sm:h-[500px] lg:h-screen relative overflow-hidden">
        <img
          src="./SignUp.jpg"
          alt="login"
          className="w-full h-full object-cover object-center rounded-b-3xl lg:rounded-l-3xl lg:rounded-r-none shadow-lg transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-8 lg:px-16 py-8 lg:py-0 bg-[#E0E1DD]">
        <div className="text-center mb-8 lg:mb-12">
          <img
            src="logo2.png"
            alt="logo"
            className="w-[150px] sm:w-[180px] lg:w-[200px] h-auto mx-auto object-contain"
          />
          <p className="text-[#18324E] font-semibold text-[20px] sm:text-[24px] lg:text-[32px]">
            Login to your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-4 lg:space-y-6"
        >
          {error && (
            <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-[#18324E] font-medium mb-2 text-sm sm:text-base"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl p-3 sm:p-4 bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8AB1DB] focus:border-transparent text-sm sm:text-base"
              placeholder="jane@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[#18324E] font-medium mb-2 text-sm sm:text-base"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl p-3 sm:p-4 bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8AB1DB] focus:border-transparent text-sm sm:text-base"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1672D4] hover:bg-[#8AB1DB] text-white font-semibold py-3 sm:py-4 px-6 rounded-xl transition-colors duration-200 text-sm sm:text-base disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-[#18324E] text-sm sm:text-base">
            Don't have an account?
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-[#1672D4] hover:text-[#8974c9] font-medium ml-1 bg-transparent border-none cursor-pointer"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
