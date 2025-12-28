import { useLoaderData, useRevalidator } from "react-router-dom";
import CardCart from "../features/cart/CardCart";
import OrderSummary from "../features/cart/OrderSummary";
import { getMyCart, removeFromCart, clearCart } from "../services/cartApi";
import { toast } from "react-hot-toast";

import EmptyCart from "../features/cart/EmptyCart";
import {
  getLocalCart,
  removeFromLocalCart,
  clearLocalCart,
} from "../utils/localCart";
import { useState } from "react";

function Cart() {
  const { cart } = useLoaderData();
  const revalidator = useRevalidator();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  if (!cart || cart.cartItems.length === 0) {
    return <EmptyCart />;
  }

  const { cartItems, totalPrice } = cart;

  async function handleDeleteItem(itemId, item = null) {
    if (isDeleting) return;
    console.log(itemId);
    // cartItems[0].productId._id;
    setIsDeleting(true);
    try {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        // Authenticated user - delete from server
        await removeFromCart(itemId);
        toast.success("item deleted");
      } else {
        // Guest user - delete from local storage
        // Pass item data for more reliable matching
        const itemData = item
          ? {
              productId: item.productId?._id || item.productId,
              color: item.color,
              size: item.size,
            }
          : null;
        removeFromLocalCart(itemId, itemData);
      }

      // Refresh the cart data
      revalidator.revalidate();
    } catch (error) {
      console.error("Failed to delete item:", error);
      toast.error("Failed to delete item from cart ❌");
    } finally {
      setIsDeleting(false);
    }
  }

  // Opens the confirmation modal for clearing the cart
  function confirmClearAll() {
    if (isClearing) return;
    setShowConfirmClear(true);
  }

  // Performs the actual clear action (no prompt)
  async function handleClearAll() {
    if (isClearing) return;

    setIsClearing(true);
    try {
      const jwt = localStorage.getItem("jwt");

      if (jwt) {
        // Authenticated user - clear server cart
        await clearCart();
      } else {
        // Guest user - clear local storage
        clearLocalCart();
      }

      // Refresh the cart data
      revalidator.revalidate();
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Failed to clear cart:", error);
      toast.error("Failed to clear cart");
    } finally {
      setIsClearing(false);
    }
  }

  return (
    <div className="px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mt-10 text-center sm:text-left">
          My Cart
        </h1>
        <button
          onClick={confirmClearAll}
          disabled={isClearing}
          className="mt-10 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          {isClearing ? "Deleting..." : " Delete All"}
        </button>
      </div>

      <div
        className="
      flex flex-col lg:flex-row 
      justify-center items-center 
      border-2 border-gray-300 border-dashed rounded-lg 
      gap-8 
      p-6
      w-full
    "
      >
        {/* Cart section */}
        <div className="w-full lg:w-2/3">
          <CardCart items={cartItems} onDeleteItem={handleDeleteItem} />
        </div>

        {/* Order summary */}
        <div className="w-full lg:w-1/3 flex justify-center items-center">
          <OrderSummary totalPrice={totalPrice} />
        </div>
      </div>

      {/* Confirmation modal for clearing the cart */}
      {showConfirmClear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => setShowConfirmClear(false)}
          />

          <div className="relative bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md z-10">
            <h3 className="text-lg font-semibold mb-3">Confirm delete</h3>
            <p className="text-sm text-gray-700 mb-6">
              Are you sure you want to delete all items from the basket? This
              action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowConfirmClear(false)}
                disabled={isClearing}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => {
                  setShowConfirmClear(false);
                  handleClearAll();
                }}
                disabled={isClearing}
              >
                {isClearing ? "Deleting..." : "Yes, delete all"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export async function loader() {
  // حاول تجيب jwt
  const jwt = (() => {
    try {
      return localStorage.getItem("jwt");
    } catch (e) {
      return null;
    }
  })();

  if (jwt) {
    // Authenticated -> call server cart (كما كان عندك)
    const { data } = await getMyCart();
    // data expected to contain { cart, totalPrice } or similar
    return data;
  }

  // Guest -> read localStorage cart
  const local = getLocalCart();
  if (!local || !local.cartItems || local.cartItems.length === 0) {
    // return shape consistent with server when cart is empty
    return { cart: null };
  }

  // Adapt local structure to match server cart shape expected by component
  const adapted = {
    cartItems: local.cartItems.map((it, idx) => ({
      _id: `${idx}-${it.productId}`,
      productId: {
        _id: it.productId,
        name: it.productSnapshot?.name || "",
        imageCover: it.productSnapshot?.imageCover || "",
        price: it.productSnapshot?.price || 0,
      },
      quantity: it.quantity,
      color: it.color,
      size: it.size,
    })),
    totalPrice:
      local.totalPrice ||
      local.cartItems.reduce((sum, it) => {
        const price = (it.productSnapshot && it.productSnapshot.price) || 0;
        return sum + price * it.quantity;
      }, 0),
  };

  return { cart: adapted };
}

export default Cart;
