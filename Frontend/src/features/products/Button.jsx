function Button({ children, onClick, chosenButton }) {
  const baseStyle = `
      relative
      min-w-[120px]
      px-6
      py-2.5
      bg-white
      text-gray-800
      text-center
      text-base
      font-medium
      rounded-xl
      shadow-sm
      cursor-pointer
      transition-all
      duration-200
      hover:bg-gray-50
      hover:shadow-md
      active:scale-95
    `;

  const selectedStyle = `
      before:content-['']
      before:absolute
      before:top-1/2
      before:-translate-y-1/2
      before:left-2.5
      before:w-2.5
      before:h-2.5
      before:rounded-full
      before:bg-[#1672D4]
      before:transition-transform
      before:duration-200
    `;

  const isSelected = chosenButton === children;

  return (
    <div
      className={`${baseStyle} ${isSelected ? selectedStyle : ""}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Button;
