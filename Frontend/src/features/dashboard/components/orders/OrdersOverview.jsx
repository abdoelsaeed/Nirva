// src/components/orders/OrdersOverview.jsx
import { useEffect } from "react";
import { useStore } from "../../store/useStore";

export default function OrdersOverview() {
  const loadOrders = useStore((s) => s.loadOrders);
  const orders = useStore((s) => s.orders);

  useEffect(() => {
    loadOrders();
  }, []);
  // defensive guards in case data isn't loaded yet
  const totalOrders = orders?.data?.totalOrders ?? 0;

  // API returns stats as [{ _id: '<status>', count: N, ... }, ...]
  const stats = (orders?.data?.stats || []).reduce((acc, o) => {
    const id = o?._id;
    const count = Number(o?.count || 0);
    if (!id) return acc;
    acc[id] = (acc[id] || 0) + count;
    acc.total = (acc.total || 0) + count;
    return acc;
  }, {});
  
  const keys = [
    { key: "shipped", color: "border-blue-500", label: "Shipped" },
    { key: "returned", color: "border-yellow-500", label: "Returned" },
    { key: "cancelled", color: "border-red-500", label: "Cancelled" },
    { key: "delivered", color: "border-green-500", label: "Delivered" },
    { key: "pending", color: "border-gray-400", label: "Pending" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Total Orders */}
      <div className="bg-white border-t-4 border-indigo-500 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
        <div className="text-gray-500 text-sm ">Total Orders</div>
        <div className="text-3xl font-bold text-gray-800 mt-1 text-indigo-500">
          {totalOrders || 0}
        </div>
      </div>

      {/* Status Boxes */}
      {keys.map((k) => (
        <div
          key={k.key}
          className={`bg-white border-t-4 ${k.color} p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 `}
        >
          <div className="text-gray-500 text-sm">
            {k.label}
          </div>
          <div className="text-3xl font-semibold text-gray-800 mt-1">
            {stats[k.key] || 0}
          </div>
        </div>
      ))}
    </div>
  );
}
