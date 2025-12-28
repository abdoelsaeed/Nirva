import { useLoaderData } from "react-router-dom";
import { getWishlist } from "../services/wishlistApi";
import Card from "../features/products/Card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
function Wishlist() {
  const { data } = useLoaderData();
  const items = data.wishList;
    if (!items || items.length === 0) {
      return (
        <div className="px-4 py-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mt-10 mb-8">
            My Wishlist
          </h1>
  
          <div className="flex flex-col items-center justify-center h-64 space-y-6">
            <p className="text-xl text-gray-600">Your Wishlist is empty.</p>
  
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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
      {items.map((item, index) => (
        <Card key={index} product={item.product_id} noLove="true" />
      ))}
    </div>
  );
}

export default Wishlist;
export async function loader() {
  // Check authentication before calling API
  const jwt = (() => {
    try {
      return localStorage.getItem("jwt");
    } catch (e) {
      return null;
    }
  })();
  if (!jwt) {
    // Not authenticated, redirect to login
    throw new Response(null, {
      status: 302,
      headers: {
        Location: "/login",
      },
    });
  }
  // Authenticated, proceed to get wishlist
  const data = await getWishlist();
  return data;
}
