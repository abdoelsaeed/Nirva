import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home2() {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate= useNavigate();
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxOffset = scrollY * 0.3;

  return (
    <section
      className="relative mt-6 sm:mt-8 md:mt-10 bg-gradient-to-br bg-[#8AB1DB]
                 w-screen -mx-[6%] min-h-[480px] sm:min-h-[560px] md:min-h-[620px] lg:min-h-[680px] xl:min-h-[720px]
                 flex items-center overflow-hidden"
      style={{
        opacity: Math.max(0.85, 1 - scrollY / 1000),
        transform: `scale(${Math.max(0.98, 1 - scrollY / 5000)})`,
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-white/20 to-transparent rounded-full blur-3xl animate-pulse"
          style={{
            animationDuration: "8s",
            transform: `rotate(${scrollY * 0.1}deg)`,
          }}
        />
        <div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-[#005BBC]/10 to-transparent rounded-full blur-3xl"
          style={{
            animationDuration: "10s",
            transform: `rotate(-${scrollY * 0.15}deg)`,
          }}
        />
      </div>

      {/* Content Container */}
      <div
        className="relative z-10 mx-auto w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[1280px] xl:max-w-[1400px] 
                      px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 md:py-10 lg:py-12"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
          {/* LEFT IMAGE */}
          <div
            className="w-full lg:w-[28%] xl:w-[30%] flex justify-center lg:justify-start order-1 lg:order-1
                       opacity-0 animate-[fadeInLeft_0.9s_ease-out_0.1s_forwards]"
            style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
          >
            <div
              className="relative group transition-all duration-300 hover:scale-105"
              style={{ transform: isMobile ? "none" : "rotate(0deg)" }}
              onMouseEnter={(e) =>
                !isMobile &&
                (e.currentTarget.style.transform = "rotate(-2deg) scale(1.05)")
              }
              onMouseLeave={(e) =>
                !isMobile &&
                (e.currentTarget.style.transform = "rotate(0deg) scale(1)")
              }
            >
              <img
                src="leftHome2.jpg"
                alt="Hoodie style variation"
                loading="lazy"
                className="w-[140px] h-[140px] xs:w-[160px] xs:h-[160px] sm:w-[180px] sm:h-[180px] 
                           md:w-[220px] md:h-[220px] lg:w-[280px] lg:h-[280px] xl:w-[320px] xl:h-[320px]
                           rounded-3xl shadow-2xl object-cover border-2 border-white/40
                           group-hover:border-white/60 transition-all duration-300 "
              />
              <div
                className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#005BBC]/20 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />
              <div
                className="absolute -inset-1 bg-gradient-to-br from-[#005BBC]/30 to-purple-500/20 
                              rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10"
              />
            </div>
          </div>

          {/* CENTER TEXT */}
          <div
            className="w-full lg:w-[44%] xl:w-[40%] text-center lg:text-left 
                       flex flex-col items-center lg:items-start gap-3 sm:gap-4 md:gap-5 lg:gap-6
                       order-2 lg:order-2 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]"
          >
            {/* Badge
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 
                         bg-white/30 backdrop-blur-sm rounded-full border border-white/40
                         opacity-0 animate-[fadeInScale_0.5s_ease-out_0.3s_forwards]"
            >
              <span className="w-2 h-2 bg-[#005BBC] rounded-full animate-pulse" />
              <span className="text-[#0D1B2A] text-xs sm:text-sm font-semibold tracking-wide">
                NEW COLLECTION
              </span>
            </div> */}

            {/* Main Heading */}
            <h2
              className="text-[#005BBC] tracking-[1px] xs:tracking-[2px] sm:tracking-[3px] md:tracking-[4px] lg:tracking-[5px] xl:tracking-[6px]
                         text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
                         font-extrabold leading-[1.1] sm:leading-tight
                         drop-shadow-[0_2px_10px_rgba(0,91,188,0.3)]
                         transition-transform duration-300 hover:scale-105 cursor-default"
            >
              One Hoodie
            </h2>

            {/* Subheading */}
            <div className="max-w-full sm:max-w-[90%] lg:max-w-[760px]">
              <p
                className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 
                            font-bold leading-tight text-gray-900/95
                            bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
              >
                Thousands of Looks
              </p>
              <span
                className="block mt-1.5 sm:mt-2 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 
                               font-medium text-gray-800/90"
              >
                Start the Style.
              </span>
            </div>

            {/* CTA Button */}
            <div className="mt-2 sm:mt-3 md:mt-4">
              <button
                className="relative overflow-hidden bg-[#0D1B2A] text-amber-50 
                           px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-4
                           rounded-2xl text-xs xs:text-sm sm:text-base md:text-lg font-bold 
                           shadow-2xl hover:shadow-[0_20px_50px_rgba(13,27,42,0.5)]
                           transition-all duration-300 group
                           hover:scale-105 active:scale-95"
                onClick={() => navigate("/products/men")}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Shop Collection
                  <span className="inline-block animate-[slideRight_1.5s_ease-in-out_infinite]">
                    →
                  </span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#005BBC] to-[#0D1B2A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Trust indicators */}
            {/* <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6 mt-2 sm:mt-3">
              <div className="flex items-center gap-1 sm:gap-1.5 text-gray-800/80">
                <span className="text-base sm:text-lg md:text-xl">★★★★★</span>
                <span className="text-xs sm:text-sm font-medium">4.9/5</span>
              </div>
              <div className="w-px h-4 sm:h-5 bg-gray-800/30" />
              <span className="text-xs sm:text-sm font-medium text-gray-800/80">
                10k+ Happy Customers
              </span>
            </div> */}
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="w-full lg:w-[28%] xl:w-[30%] flex justify-center lg:justify-end order-3 lg:order-3
                       opacity-0 animate-[fadeInRight_0.9s_ease-out_0.15s_forwards]"
            style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
          >
            <div
              className="relative group transition-all duration-300 hover:scale-105"
              style={{ transform: isMobile ? "none" : "rotate(0deg)" }}
              onMouseEnter={(e) =>
                !isMobile &&
                (e.currentTarget.style.transform = "rotate(2deg) scale(1.05)")
              }
              onMouseLeave={(e) =>
                !isMobile &&
                (e.currentTarget.style.transform = "rotate(0deg) scale(1)")
              }
            >
              <img
                src="rightHome2.jpg"
                alt="Featured hoodie design"
                loading="lazy"
                className="w-[140px] h-[140px] xs:w-[160px] xs:h-[160px] sm:w-[180px] sm:h-[180px] 
                           md:w-[220px] md:h-[220px] lg:w-[280px] lg:h-[280px] xl:w-[320px] xl:h-[320px]
                           rounded-3xl shadow-2xl object-cover border-2 border-white/40
                           group-hover:border-white/60 transition-all duration-300 max-h-[430px] "
              />
              <div
                className="absolute inset-0 rounded-3xl bg-gradient-to-tl from-[#005BBC]/20 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />
              <div
                className="absolute -inset-1 bg-gradient-to-bl from-[#005BBC]/30 to-purple-500/20 
                              rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative mesh gradient overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,91,188,0.15)_0%,transparent_50%)]" />
      </div>

      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideRight {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(4px);
          }
        }
      `}</style>
    </section>
  );
}

export default Home2;
