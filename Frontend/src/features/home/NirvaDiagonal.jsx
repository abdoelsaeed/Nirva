function NirvaDiagonal() {
  return (
     <div className="absolute inset-0 w-full h-full overflow-hidden bg-transparent pointer-events-none hidden sm:block z-0">
      {/* Fiمين الrst NIRVA - Top Left to Bottom Right */}
      <div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        style={{
          transform: "rotate(-20deg)",
          transformOrigin: "center",
        }}
      >
        <h1
          className="text-[#000000] font-bold whitespace-nowrap select-none w-[1500px]"
          style={{
            fontFamily: "Kalnia, serif",
            fontSize: "clamp(32px, 8vw, 100px)",
            lineHeight: "100%",
            letterSpacing: "clamp(2em, 17vw, 6em)",
            opacity: 0.08,
            textShadow: "0 0 20px rgba(0,0,0,0.1)",
          }}
        >
          NIRVA
        </h1>
      </div>

      {/* Second NIRVA - Top Right to Bottom Left */}
      <div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        style={{
          transform: "rotate(20deg)",
          transformOrigin: "center",
        }}
      >
        <h1
          className="text-[#000000] font-bold whitespace-nowrap select-none w-[1500px]"
          style={{
            fontFamily: "Kalnia, serif",
            fontWeight: 700,
            fontSize: "clamp(32px, 8vw, 100px)",
            lineHeight: "100%",
            letterSpacing: "clamp(2em, 17vw, 6em)",
            opacity: 0.08,
            textShadow: "0 0 20px rgba(0,0,0,0.1)",
          }}
        >
          NIRVA
        </h1>
      </div>
    </div>
  );
}

export default NirvaDiagonal;
