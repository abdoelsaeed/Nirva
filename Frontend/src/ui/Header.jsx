import { Link, useNavigate } from "react-router-dom";
import List from "./List";
import ListIclons from "./ListIclons";
import { useState } from "react";
import { useSelector } from "react-redux";

function Header() {
  const isAuthenticated = !!localStorage.getItem("jwt");
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("jwt");
    window.location.href = "/";
  }


  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm ">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Left - Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <img
                src="/logo2.png"
                alt="Nirva Logo"
                className="max-h-[140px] mt-10 w-[200px] py-2 mg:p-0 md:max-h-[160px] md:max-w-[170px] lg:p-0 lg:max-h-[160px] lg:max-w-[170px] object-contain hover:opacity-95 transition-all duration-300 transform hover:scale-105"
              />
            </Link>
          </div>

          {/* Center - Main Navigation */}
          <div className="hidden lg:block flex-grow px-4">
            <List />
          </div>

          {/* Right - Icons and User Actions */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            {/* Cart, Wishlist Icons for large screens */}
            <div className="hidden lg:flex items-center gap-3 lg:gap-4">
              <ListIclons />
            </div>

            {/* Burger Menu for Icons only on mobile and tablet */}
            <button
              className="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="#1672d4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLogout}
                  className="bg-white border border-[#1672d4] text-[#1672d4] font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-sm hover:bg-[#1672d4] hover:text-white transition-colors duration-200 text-sm sm:text-base"
                >
                  Logout
                </button>
                {user?.role === "admin" && (
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-[#fffbeb] border border-yellow-300 text-yellow-700 font-semibold px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl shadow-sm hover:bg-yellow-200 transition-colors duration-200 text-sm sm:text-base"
                  >
                    Dashboard
                  </button>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-[#1672d4] text-white font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-sm hover:bg-[#0d5bb8] transition-colors duration-200 text-sm sm:text-base">
                  LogIn
                </button>
              </Link>
            )}
          </div>

          {/* Mobile and tablet icons menu overlay */}
          {menuOpen && (
            <div
              className="lg:hidden fixed top-16 sm:top-20 right-0 w-auto sm:w-72 bg-white/95 shadow-xl rounded-bl-xl p-4 flex flex-col gap-4
            backdrop-blur-lg border-t border-gray-100 z-50 transition-all duration-300 animate-fadeIn"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Menu</span>
                <button
                  className="text-gray-500 hover:text-[#1672d4] p-1"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {/* Add main navigation links for mobile/tablet */}
              <div className="pt-2 pb-2">
                <List />
              </div>
              <div className="border-t border-gray-100 pt-3">
                <ListIclons />
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
