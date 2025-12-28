import { useState } from "react";
import { addToCart } from "../../../services/cartApi";
import { addToLocalCart } from "../../../utils/localCart";
import { toast } from "react-hot-toast";

function AddToCardButton({
  selectedColor,
  selectedSize,
  productId,
  isAuthenticated,
  product,
  successMsg,
  setSuccessMsg,
}) {
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleAddToCart() {
    if (loading) return;
    setLoading(true);

    // detect jwt (same approach as عندك)
    const jwt = (() => {
      try {
        return localStorage.getItem("jwt");
      } catch (e) {
        return null;
      }
    })();

    if (!isAuthenticated && !jwt) {
      // Guest -> store in localStorage
      try {
        // ensure fields
        if (!selectedColor || !selectedSize) {
          toast.error("Please select color & size");
          setLoading(false);
          return;
        }

        // item shape for localCart
        const item = {
          productId: productId.toString(),
          quantity: 1,
          color: selectedColor,
          size: selectedSize,
          // snapshot price so guest total is computed reliably on client (server will verify)
          productSnapshot: {
            price: product?.price || 0,
            name: product?.name || "",
            imageCover: product?.imageCover || "",
          },
        };

        addToLocalCart(item);

        setAdded(true);
        setSuccessMsg("✅ Product added to cart");

        setTimeout(() => {
          setAdded(false);
          setSuccessMsg("");
        }, 2500);
      } catch (err) {
        console.error("addToLocalCart failed", err);
        toast.error("Failed to add item to local cart");
      } finally {
        setLoading(false);
      }
      return;
    }

    // Authenticated -> call backend endpoint
    try {
      await addToCart(selectedColor, selectedSize, productId);
      setAdded(true);
      setSuccessMsg("✅ Product added to cart");

      setTimeout(() => {
        setAdded(false);
        setSuccessMsg("");
      }, 2500);
    } catch (error) {
      console.error("Failed to add to cart", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to add to cart"
      );
      setAdded(false);
    } finally {
      setLoading(false);
    }
  }
  return (
    <button
      onClick={handleAddToCart}
      className="flex-1 relative overflow-hidden bg-[#1672d4] text-white px-3 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-[#0d5bb8] hover:scale-105 active:scale-95"
      disabled={loading}
    >
      <div className="flex items-center justify-center">
        {/* Text */}
        <span
          className={`transition-all duration-300 text-white ${
            !added ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        >
          Add to cart
        </span>

        {/* Cart Icon */}
        <span
          className={`absolute transition-all duration-300 text-2xl ${
            added
              ? "opacity-100 translate-x-0 scale-110"
              : "opacity-0 translate-x-4 scale-0"
          }`}
          style={{
            transform: "scaleX(1.2) scaleY(1.1)",
            borderRadius: "50%",
            padding: "4px 8px",
            color: "white",
          }}
        >
          🛒
        </span>
      </div>
    </button>
  );
}

export default AddToCardButton;
