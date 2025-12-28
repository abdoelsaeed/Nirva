import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
function EmptyCart() {
  return (
    <div className="px-4 py-10 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mt-10 mb-8">
        My Cart
      </h1>

      <div className="flex flex-col items-center justify-center h-64 space-y-6">
        <p className="text-xl text-gray-600">Your cart is empty.</p>

        <Link
          to="/products/men"
          className="
            inline-flex items-center gap-2 bg-[#4F954F] text-white 
            px-5 py-3 rounded-xl text-lg font-medium
            hover:bg-[#3E7A3E] active:bg-[#366A36] 
            transition-colors duration-200
          "
        >
          Go Shopping Now
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

export default EmptyCart;
