// src/features/home/Home3.jsx
import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";

function Home3() {
  return (
    <div className="bg-white py-16">
      <div className="w-[90%] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#005BBC] mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our different clothing categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CategoryCard
            title="Hoodies"
            imageSrc="./t-shirt.png"
            imageAlt="Hoodies"
          />
          <CategoryCard
            title="pants"
            imageSrc="./bantlone.png"
            imageAlt="pants"
          />
          <CategoryCard
            title="T-Shirts"
            imageSrc="/hooide.png"
            imageAlt="T-Shirts"
          />
        </div>

        {/* Call to Action */}

        <div className="text-center mt-16">
          <Link to="/products/men">
            <button className="bg-[#005BBC] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#1672D4] transition-colors">
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home3;
