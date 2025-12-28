import { useState } from "react";
import { addToWishlist } from "../../../services/wishlistApi";

function AddToWishlistButton({ productId }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLove() {
    if (loading) return;
    // optimistic update
    const prev = isWishlisted;
    setIsWishlisted(!prev);
    setLoading(true);
    try {
      await addToWishlist(productId);
    } catch (error) {
      console.error("Failed to add to wishlist", error);
      // revert optimistic update
      setIsWishlisted(prev);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLove}
      disabled={loading}
      aria-pressed={isWishlisted}
      className={`px-3 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${"bg-gray-200 text-gray-700 hover:bg-gray-300"} ${loading ? "opacity-60 cursor-wait" : ""}`}
    >
      <span className="text-[23px]">{isWishlisted ? "❤️" : "🤍"}</span>
    </button>
  );
}

export default AddToWishlistButton;
