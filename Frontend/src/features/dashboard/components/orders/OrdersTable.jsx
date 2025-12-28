import  { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../../../services/orderApi";
import HeaderOrdersTable from "./HeaderOrdersTable";

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [query, setQuery] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [actionLoading, setActionLoading] = useState(null);
  const [notice, setNotice] = useState(null);

  // NEW: status filter state
  const [statusFilter, setStatusFilter] = useState("all");

  // statuses to show as radios (order as you like)
  const statuses = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "confirmed", label: "Confirmed" },
    { key: "shipped", label: "Shipped" },
    { key: "delivered", label: "Delivered" },
    { key: "cancelled", label: "Cancelled" },
    { key: "returned", label: "Returned" },
  ];

  useEffect(() => {
    let mounted = true;
    async function fetchOrders() {
      setLoading(true);
      setError(null);
      try {
        // pass status only when not "all"
        const params = { limit: perPage, q: query };
        if (statusFilter && statusFilter !== "all")
          params.status = statusFilter;

        const response = await getOrders(currentPage, params);
        if (!mounted) return;
        // support both shapes: response or response.data
        const payload = response?.data ? response : { data: response };
        setOrders(payload.data.orders || []);
        setPagination(payload.pagination || {});
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setError("Failed to fetch orders, please try again");
        setOrders([]);
        setPagination({});
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }
    fetchOrders();
    return () => (mounted = false);
  }, [currentPage, perPage, query, statusFilter]); // include statusFilter

  // when user changes filter, reset page to 1
  function handleStatusChange(newStatus) {
    setStatusFilter(newStatus);
    setCurrentPage(1);
  }

  async function changeStatus(id, status) {
    if (!id) return;
    const prevOrders = orders;
    setOrders((arr) =>
      arr.map((o) => (o._id === id || o.id === id ? { ...o, status } : o))
    );
    setActionLoading(id);
    setNotice(null);

    try {
      const res = await updateOrderStatus(id, status);
      const updatedOrder = res?.data?.order || res?.data || null;
      if (updatedOrder) {
        setOrders((arr) =>
          arr.map((o) =>
            o._id === id || o.id === id ? { ...o, ...updatedOrder } : o
          )
        );
      }
      setNotice({
        type: "success",
        text: `Order status updated to "${status}".`,
      });
    } catch (err) {
      console.error("changeStatus error:", err);
      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error?.message ||
        err?.message ||
        "Failed to update order";
      setOrders(prevOrders);
      setNotice({ type: "error", text: serverMessage });
    } finally {
      setActionLoading(null);
      setTimeout(() => setNotice(null), 4000);
    }
  }

  function statusBadge(status) {
    const map = {
      shipped: "bg-blue-100 text-blue-700",
      cancelled: "bg-red-100 text-red-700",
      delivered: "bg-green-100 text-green-700",
      pending: "bg-gray-100 text-gray-600",
      confirmed: "bg-purple-100 text-purple-700",
      returned: "bg-yellow-100 text-yellow-700",
    };
    return map[status] || "bg-gray-100 text-gray-600";
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      {/* Header */}
      <HeaderOrdersTable />

      {/* STATUS RADIO FILTERS */}
      <div className="mt-4 mb-6 flex flex-wrap items-center gap-3">
        {statuses.map((s) => (
          <label
            key={s.key}
            className={`inline-flex items-center gap-2 cursor-pointer px-3 py-1 rounded-full text-sm font-medium transition
              ${statusFilter === s.key ? "bg-indigo-600 text-white shadow" : "bg-gray-100 text-gray-700"}
            `}
          >
            <input
              type="radio"
              name="orderStatus"
              value={s.key}
              checked={statusFilter === s.key}
              onChange={() => handleStatusChange(s.key)}
              className="hidden"
              aria-label={`Filter ${s.label}`}
            />
            {/* visual dot */}
            <span
              className={`w-2 h-2 rounded-full transition ${
                statusFilter === s.key ? "bg-white" : "bg-gray-400"
              }`}
            />
            <span className="capitalize">{s.label}</span>
          </label>
        ))}

        {/* clear filter quick button */}
        {statusFilter !== "all" && (
          <button
            onClick={() => handleStatusChange("all")}
            className="ml-2 text-sm text-indigo-600 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* Notice */}
      {notice && (
        <div
          className={`mb-6 p-3.5 rounded-md text-sm font-medium ${
            notice.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {notice.text}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "#",
                "Customer",
                "Phone",
                "Address",  
                "Date",
                "Total",
                "Status",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${
                    heading === "Total" || heading === "Actions"
                      ? "text-right"
                      : ""
                  }`}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {loading ? (
              Array.from({ length: perPage }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array.from({ length: 8 }).map((_, j) => (
                    <td key={j} className="px-4 py-4">
                      <div className="h-4 bg-gray-200 rounded w-24" />
                    </td>
                  ))}
                </tr>
              ))
            ) : orders.length > 0 ? (
              orders.map((o, i) => (
                <tr
                  key={o.id || o._id || i}
                  className="hover:bg-indigo-50 transition-all duration-150"
                >
                  <td className="px-4 py-4 text-sm font-medium text-gray-800">
                    {i + 1}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {o.customer_name || o.name || "—"}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {o.customer_phone || o.phone || "—"}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {o.address || "—"}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {o.created_at
                      ? new Date(o.created_at).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-right text-gray-800">
                    {o.totalPrice ?? o.total ?? 0}{" "}
                    <span className="text-gray-400">EGP</span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(o.status)}`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right flex items-center justify-end gap-2">
                    {o.status !== "delivered" && (
                      <>
                        {o.status !== "shipped" && (
                          <button
                            onClick={() =>
                              changeStatus(o.id || o._id, "shipped")
                            }
                            disabled={actionLoading === (o.id || o._id)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs transition-all shadow-sm disabled:opacity-60"
                          >
                            Mark Shipped
                          </button>
                        )}
                        <button
                          onClick={() =>
                            changeStatus(o.id || o._id, "delivered")
                          }
                          disabled={actionLoading === (o.id || o._id)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs transition-all shadow-sm disabled:opacity-60"
                        >
                          Mark Delivered
                        </button>
                        <button
                          onClick={() =>
                            changeStatus(o.id || o._id, "cancelled")
                          }
                          disabled={actionLoading === (o.id || o._id)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs transition-all shadow-sm disabled:opacity-60"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {o.status === "delivered" && (
                      <span className="inline-flex items-center px-3 py-1 rounded-md bg-green-50 text-green-700 text-xs font-semibold shadow-sm">
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-12 text-gray-500 text-sm"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-800">{orders.length}</span>{" "}
          of{" "}
          <span className="font-semibold text-gray-800">
            {pagination.totalDocs ?? "-"}
          </span>{" "}
          results
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={!pagination.hasPrevPage || loading}
            className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-100 disabled:opacity-50 transition"
          >
            Prev
          </button>

          <span className="text-sm font-medium text-gray-700">
            Page {pagination.currentPage || currentPage} /{" "}
            {pagination.totalPages || "-"}
          </span>

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={!pagination.hasNextPage || loading}
            className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-100 disabled:opacity-50 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
