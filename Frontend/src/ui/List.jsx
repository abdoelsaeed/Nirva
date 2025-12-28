import { Link, useLocation } from "react-router-dom";

function List() {
  const location = useLocation();

  // دالة لتحديد إذا كان الرابط هو النشط حاليًا
  function isActive(path) {
    return location.pathname === path;
  }

  // تصميمات اللينك
  const baseStyle =
    "text-black text-lg sm:text-xl lg:text-2xl hover:text-gray-600 transition-colors duration-200";
  const activeStyle = "border-b-2 border-black";

  return (
    <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
      <li>
        <Link
          to="/"
          className={`${baseStyle} ${isActive("/") ? activeStyle : ""}`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/products/men"
          className={`${baseStyle} ${
            isActive("/products/men") ? activeStyle : ""
          }`}
        >
          Men
        </Link>
      </li>
      <li>
        <Link
          to="/products/women"
          className={`${baseStyle} ${
            isActive("/products/women") ? activeStyle : ""
          }`}
        >
          Women
        </Link>
      </li>
      <li>
        <Link
          to="/products/kids"
          className={`${baseStyle} ${
            isActive("/products/kids") ? activeStyle : ""
          }`}
        >
          Kids
        </Link>
      </li>
    </ul>
  );
}

export default List;
