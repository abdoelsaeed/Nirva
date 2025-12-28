function CircleSize({ children, onClick, isChosen }) {
  const style =
    "w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer transition-colors duration-200 p-4 font-medium text-gray-600";
  const chosenStyle = "bg-[#1672D4] text-white";
  const finalStyle = isChosen === children ? `${style} ${chosenStyle}` : style;
  return (
    <div onClick={onClick} className={finalStyle}>
      {children}
    </div>
  );
}

export default CircleSize;
