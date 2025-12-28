import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ComingSoon() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1B263B] to-[#415A77] flex items-center justify-center overflow-hidden z-50 ">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden ">
        {/* Floating Circles */}
        <div className="absolute top-6 sm:top-12 left-6 sm:left-12 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-[#1672D4]/20 rounded-full animate-pulse"></div>
        <div className="absolute top-12 sm:top-24 right-6 sm:right-16 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-amber-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-12 sm:bottom-20 left-1/4 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#1672D4]/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-6 sm:bottom-12 right-6 sm:right-12 w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-amber-400/15 rounded-full animate-bounce"></div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 sm:grid-cols-10 lg:grid-cols-12 grid-rows-6 sm:grid-rows-8 h-full w-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-white/10"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`relative z-10 text-center transition-all duration-1000 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Logo */}
        <div className="mb-4 sm:mb-6 md:mb-8 mt-2 sm:mt-4 md:mt-6 lg:mt-10">
          <h1
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2 px-2 sm:px-4"
            style={{ fontFamily: "Kalnia, serif" }}
          >
            NIRVA
          </h1>
          <div className="w-6 sm:w-10 md:w-14 lg:w-16 h-0.5 bg-gradient-to-r from-[#1672D4] to-amber-400 mx-auto rounded-full"></div>
        </div>

        {/* Coming Soon Text */}
        <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 px-2 sm:px-4">
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 tracking-wider">
            COMING
          </h2>
          <h2
            className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#1672D4] to-amber-400 bg-clip-text text-transparent mb-1 sm:mb-2 tracking-wider"
            style={{ WebkitBackgroundClip: "text", MozBackgroundClip: "text" }}
          >
            SOON
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 max-w-md mx-auto leading-relaxed">
            We're crafting something extraordinary for you.
            <br className="hidden sm:block" />
            <span className="text-amber-400 font-semibold">
              Stay tuned for the launch!
            </span>
          </p>
        </div>

        {/* Animated Progress Bar */}
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-xs sm:max-w-sm md:max-w-md mx-auto px-2 sm:px-4">
          <div className="flex justify-between text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">
            <span>Development</span>
            <span>85%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1 sm:h-1.5 md:h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#1672D4] to-amber-400 rounded-full animate-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6 max-w-3xl mx-auto px-2 sm:px-4">
          <div
            className="bg-white/5 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/10 hover:bg-white/10 transition-all duration-300"
            style={{
              WebkitBackdropFilter: "blur(4px)",
              MozBackdropFilter: "blur(4px)",
            }}
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-[#1672D4] rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-xs sm:text-sm md:text-base">👕</span>
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-1">
              Premium Apparel
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Crafted essentials for your everyday life
            </p>
          </div>

          <div
            className="bg-white/5 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/10 hover:bg-white/10 transition-all duration-300"
            style={{
              WebkitBackdropFilter: "blur(4px)",
              MozBackdropFilter: "blur(4px)",
            }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-amber-400 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
              <span className="text-sm sm:text-lg md:text-2xl">🚀</span>
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 sm:mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base">
              Lightning-fast shipping worldwide
            </p>
          </div>

          <div
            className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
            style={{
              WebkitBackdropFilter: "blur(4px)",
              MozBackdropFilter: "blur(4px)",
            }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#1672D4] rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
              <span className="text-sm sm:text-lg md:text-2xl">💎</span>
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 sm:mb-2">
              Quality First
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base">
              Premium materials, exceptional quality
            </p>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="max-w-xs mx-auto px-2">
          <p className="text-gray-300 mb-2 text-xs sm:text-sm">
            Ready to explore our current collection?
          </p>
          <div className="flex justify-center">
            <Link
              to="/"
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#1672D4] to-amber-400 text-white font-semibold rounded-lg hover:from-[#0d5bb8] hover:to-amber-500 transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm shadow-lg hover:shadow-xl"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
