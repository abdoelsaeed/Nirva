import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingCart,
  faHeart,
  faClipboardList, // أيقونة الطلبات
} from "@fortawesome/free-solid-svg-icons";

function ListIclons() {
  return (
    <ul className="flex flex-row flex-wrap lg:flex-nowrap items-center justify-center gap-2 sm:gap-3 lg:gap-4 w-full lg:w-auto">
      {/** Common button classes for uniform size */}
      <li>
        <Link
          to="/profile"
          aria-label="Profile"
          className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg text-gray-700 hover:text-[#1672d4] bg-white/0 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <FontAwesomeIcon
            icon={faUser}
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5"
          />
        </Link>
      </li>

      <li>
        <Link
          to="/cart"
          aria-label="Cart"
          className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg text-gray-700 hover:text-[#1672d4] bg-white/0 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5"
          />
        </Link>
      </li>

      <li>
        <Link
          to="/products/wishlist"
          aria-label="Wishlist"
          className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg text-gray-700 hover:text-[#1672d4] bg-white/0 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <FontAwesomeIcon
            icon={faHeart}
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5"
          />
        </Link>
      </li>

      <li>
        <Link
          to="/my-orders"
          aria-label="Orders"
          className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg text-gray-700 hover:text-[#1672d4] bg-white/0 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <FontAwesomeIcon
            icon={faClipboardList}
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5"
          />
        </Link>
      </li>
    </ul>
  );
}

export default ListIclons;
