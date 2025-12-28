import { useState } from "react";
import { removeFromWishlist } from "../../../services/wishlistApi";

function RemoveFromWishlistButton({ productId }) {
  const [isWishlisted, setIsWishlisted] = useState(true);
  const [loading, setLoading] = useState(false);

  async function handleRemove() {
    if (loading) return;
    // optimistic update
    const prev = isWishlisted;
    setIsWishlisted(false);
    setLoading(true);
    try {
      await removeFromWishlist(productId);
      window.location.reload(); // reload page after successful removal
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
      // revert optimistic update
      setIsWishlisted(prev);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleRemove}
      disabled={loading}
      aria-pressed={!isWishlisted}
      className={`px-3 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 bg-gray-200 text-gray-700 hover:bg-gray-300 ${loading ? "opacity-60 cursor-wait" : ""}`}
    >
      <span className="text-[23px]">❌</span>
    </button>
  );
}

export default RemoveFromWishlistButton;
