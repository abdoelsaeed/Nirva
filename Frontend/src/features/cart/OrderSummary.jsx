import { useState } from "react";
import { createOrder, createOrderGuest } from "../../services/orderApi";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-hot-toast";

import { getLocalCart, clearLocalCart } from "../../utils/localCart";
function OrderSummary({ totalPrice }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [successMsg, setSuccessMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleCreateOrder() {
    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill in all fields before checking out.");
      return;
    }

    setLoading(true);
    try {
      const jwt = (() => {
        try {
          return localStorage.getItem("jwt");
        } catch (e) {
          return null;
        }
      })();

      let orderData = {
        customer_name: form.name,
        customer_phone: form.phone,
        address: form.address,
      };

      if (!jwt) {
        // guest checkout: read cart from localStorage
        const localCart = getLocalCart();
        if (
          !localCart ||
          !localCart.cartItems ||
          localCart.cartItems.length === 0
        ) {
          toast.error("Your cart is empty.");
          setLoading(false);
          return;
        }

        orderData.orderItems = localCart.cartItems.map((it) => ({
          productId: it.productId,
          quantity: it.quantity,
          color: it.color,
          size: it.size,
        }));
        orderData.totalPrice = localCart.totalPrice || 0;
      }

      // send to backend
      const res = !jwt ? await createOrderGuest(orderData) : await createOrder(orderData);
      clearLocalCart();

      setSuccessMsg("✅ Order created successfully!🎉");

      // cleanup
      if (!jwt) {
        clearLocalCart();
      } else {
        // if authenticated: optionally refresh server cart state in your app
      }

      // redirect to order page (if returned)
      const orderId = res?.data?.data?.order?._id;
      setTimeout(() => {
        if (orderId) window.location.href = `/order/${orderId}`;
        else window.location.href = `/`;
      }, 800);
    } catch (err) {
      console.error("Order creation failed", err);
      toast.error(
        err?.response?.data?.message ||
          "Failed to create order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-full lg:w-1/1 flex justify-center">
      <div className="w-full max-w-sm bg-white shadow-md rounded-2xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Order Summary
        </h2>
        {successMsg && (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            className="mb-4"
          >
            {successMsg}
          </Alert>
        )}
        {/* Form Inputs */}
        <div className="space-y-4 mb-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4F954F]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4F954F]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4F954F] resize-none"
              rows="3"
            ></textarea>
          </div>
        </div>

        {/* Summary */}
        <div className="flex justify-between text-gray-700 mb-2">
          <span>Subtotal</span>
          <span>{totalPrice.toFixed(2)} EGP</span>
        </div>
        <div className="flex justify-between text-gray-700 mb-2">
          <span>Shipping</span>
          <span>0 EGP</span>
        </div>
        <div className="flex justify-between font-semibold text-gray-900 text-lg mt-4 border-t pt-3">
          <span>Total</span>
          <span>{totalPrice.toFixed(0)} EGP</span>
        </div>

        <button
          className="w-full bg-[#4F954F] text-white py-3 mt-6 rounded-xl hover:bg-[#3E7A3E] transition-colors duration-200 disabled:opacity-60"
          disabled={loading}
          onClick={handleCreateOrder}
        >
          {loading ? "Processing..." : "Checkout"}
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
