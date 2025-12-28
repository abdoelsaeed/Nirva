function CircleColors({ availableColors, selectedColor, onSelectColor }) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 items-center">
      <span className="font-semibold text-gray-700 text-xs sm:text-sm whitespace-nowrap">Colors:</span>
      {availableColors.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onSelectColor(color)}
          className={`flex items-center gap-1 sm:gap-1.5 focus:outline-none transition-transform hover:scale-105 active:scale-95`}
          style={{ background: "none", border: "none", padding: 0, margin: 0 }}
        >
          <span
            className={`inline-block w-5 h-5 sm:w-6 sm:h-6 rounded-full border transition-all duration-200 ${selectedColor === color ? "border-2 border-[#1672D4] shadow-lg scale-110" : "border-gray-300 border"}`}
            style={{
              backgroundColor: color.toLowerCase(),
              boxShadow: selectedColor === color ? "0 0 0 2px #1672D4" : "none",
            }}
            title={color}
          ></span>
          <span
            className={`text-[10px] sm:text-xs hidden sm:inline ${selectedColor === color ? "font-bold text-[#1672D4]" : "text-gray-600"}`}
          >
            {color}
          </span>
        </button>
      ))}
    </div>
  );
}

export default CircleColors;
