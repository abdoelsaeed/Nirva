import { Link } from "react-router-dom";

// src/features/home/CategoryCard.jsx
function CategoryCard({ title, imageSrc, imageAlt }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-64 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 w-full h-full flex items-center justify-center">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <span>{title} Image</span>
          )}
        </span>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-[#005BBC]">{title}</h1>
          <Link to="/products/men">
            <button className="bg-[#1672D4] text-white px-6 py-2 rounded-lg hover:bg-[#8AB1DB] transition-colors">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
