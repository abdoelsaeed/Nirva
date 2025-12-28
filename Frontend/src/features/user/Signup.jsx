import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../services/userApi";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        password: e.target.password.value,
        address: e.target.address.value,
        phone: e.target.phone.value,
      };

      const res = await signUp(formData);

      // If backend sets cookie (jwt) and returns success, navigate home
      if (res?.token) {
        navigate("/");
      } else {
        setError("Signup did not return a token");
      }
    } catch (err) {
      console.error("Signup caught error:", err);
      // axios interceptor returns error as thrown; try to extract message
      const message =
        err?.response?.data?.message || err?.message || "Signup failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Left side - Image */}
      <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-screen overflow-hidden">
        <img
          src="./SignUp.jpg"
          alt="signup"
          className="w-full h-full object-cover "
        />
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center px-4 sm:px-8 lg:px-12 py-3 lg:py-4 bg-[#E0E1DD]">
        <div className="text-center mb-2">
          <img
            src="logo2.png"
            alt="logo"
            className="w-[140px] sm:w-[160px] lg:w-[180px] h-auto mx-auto object-contain"
          />
          <p className="text-[#18324E] font-semibold text-[18px] sm:text-[22px] lg:text-[28px]">
            Create an account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-2 lg:space-y-3"
        >
          {error && (
            <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          {/* Name fields */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-[#18324E] font-medium mb-1 text-sm"
              >
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                required
                minLength={2}
                className="w-full rounded-xl p-2 sm:p-3 bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8AB1DB] focus:border-transparent text-sm"
                placeholder="Jane"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-[#18324E] font-medium mb-1 text-sm"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                required
                minLength={2}
                className="w-full rounded-xl p-2 sm:p-3 bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8AB1DB] focus:border-transparent text-sm"
                placeholder="Week"
              />
            </div>
          </div>

          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className="block text-[#18324E] font-medium mb-1 text-sm"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded-xl p-2 sm:p-3 bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8AB1DB] focus:border-transparent text-sm"
              placeholder="jane@example.com"
            />
          </div>

          {/* Address field */}
          <div>
            <label
              htmlFor="address"
              className="block text-[#18324E] font-medium mb-1 text-sm"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              className="w-full rounded-xl p-2 sm:p-3 bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8AB1DB] focus:border-transparent text-sm"
              placeholder="123 Main St, City, Country"
            />
          </div>

          {/* Phone field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-[#18324E] font-medium mb-1 text-sm"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full rounded-xl p-2 sm:p-3 bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8AB1DB] focus:border-transparent text-sm"
              placeholder="+20 1X XXX XXXX"
            />
          </div>

          {/* Password field */}
          <div>
            <label
              htmlFor="password"
              className="block text-[#18324E] font-medium mb-1 text-sm"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              minLength={6}
              className="w-full rounded-xl p-2 sm:p-3 bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8AB1DB] focus:border-transparent text-sm"
              placeholder="Enter your password"
            />
          </div>

          {/* Sign up button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1672D4] hover:bg-[#8AB1DB] text-white font-semibold py-2 sm:py-3 px-6 rounded-xl transition-colors duration-200 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {/* Login link */}
          <p className="text-center text-[#18324E] text-sm sm:text-base">
            Already have an account?
            <button className="text-[#1672D4] hover:text-[#8974c9] font-medium ml-1 bg-transparent border-none cursor-pointer">
              <Link to="/login">Log in</Link>
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
