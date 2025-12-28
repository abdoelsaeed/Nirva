import  { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getMyOrders } from "../services/orderApi"; // adjust path if needed
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- Helpers ---------------- */
function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
function formatEGP(val) {
  if (val == null) return "—";
  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(val);
}

/* status variants (badge, accent bar, ring) */
const STATUS_VARIANTS = {
  pending: {
    badge: "bg-amber-100 text-amber-800",
    accent: "from-amber-300 to-amber-500",
    ring: "ring-amber-200/30",
  },
  confirmed: {
    badge: "bg-indigo-100 text-indigo-800",
    accent: "from-indigo-400 to-indigo-600",
    ring: "ring-indigo-200/30",
  },
  returned: {
    badge: "bg-orange-100 text-orange-800",
    accent: "from-orange-400 to-orange-600",
    ring: "ring-orange-200/30",
  },
  shipped: {
    badge: "bg-sky-100 text-sky-800",
    accent: "from-sky-400 to-sky-600",
    ring: "ring-sky-200/30",
  },
  delivered: {
    badge: "bg-emerald-100 text-emerald-800",
    accent: "from-emerald-400 to-emerald-600",
    ring: "ring-emerald-200/30",
  },
  cancelled: {
    badge: "bg-rose-100 text-rose-800",
    accent: "from-rose-400 to-rose-600",
    ring: "ring-rose-200/30",
  },
  unknown: {
    badge: "bg-gray-100 text-gray-800",
    accent: "from-gray-300 to-gray-500",
    ring: "ring-gray-200/30",
  },
};
function getStatusVariant(status) {
  const key = String(status || "unknown").toLowerCase();
  return STATUS_VARIANTS[key] || STATUS_VARIANTS.unknown;
}

/* ---------------- Component ---------------- */
export default function MyOrdersNice() {
  const loaderData = useLoaderData();
  const payload = loaderData?.data ?? loaderData ?? {};
  const orders = Array.isArray(payload.orders)
    ? payload.orders
    : Array.isArray(payload.data?.orders)
      ? payload.data.orders
      : Array.isArray(payload.data)
        ? payload.data
        : [];
  const pagination =
    payload.pagination ?? payload.data?.pagination ?? payload.meta ?? {};
  const isLoading = loaderData?.status === "loading";
  const error = loaderData?.error;

  const [expanded, setExpanded] = useState({});
  const [q, setQ] = useState("");

  function toggle(id) {
    setExpanded((s) => ({ ...s, [id]: !s[id] }));
  }
  function handleView(order) {
    window.open(`/orders/${order._id || order.id}`, "_blank");
  }
  function handleReorder(order) {
    alert("Reorder: implement adding items to cart.");
  }
  function handleInvoice(order) {
    alert("Invoice: implement invoice download.");
  }

  // lightweight filtered list (UI-only)
  const visible = q
    ? orders.filter(
        (o) =>
          String(o._id || o.id || "").includes(q) ||
          String(o.customer_name || "")
            .toLowerCase()
            .includes(q.toLowerCase())
      )
    : orders;

  return (
    <>
      <div className="w-full min-h-screen bg-white p-4 sm:p-6 lg:p-8 bg-gray-50 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 animated-border bg-white p-6 rounded-xl mb-15 shadow-md">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#4f39f6] to-[#8b5cf6] tracking-tight mt-10">
              My Orders
            </h1>
            <p className="text-sm text-white max-w-lg font-medium">
              Clean, modern overview of your orders — expand any card to see
              items and quick actions.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-md border border-gray-200">
                <div className="text-sm text-gray-700 font-medium">Showing</div>
                <div className="text-sm font-semibold text-gray-900">
                  {orders.length}
                </div>
                <div className="text-sm text-gray-500">orders</div>
                {pagination.totalDocs != null && (
                  <div className="text-sm text-gray-500">
                    • total {pagination.totalDocs}
                  </div>
                )}
              </div>

              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 font-medium">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7h18M3 12h18M3 17h18"
                  />
                </svg>
                <div>Recent first</div>
              </div>
            </div>
          </div>
        </header>

        {/* Body */}
        {isLoading && (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white p-6 border border-gray-200 shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-200" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {error && !isLoading && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-700 font-medium">
            Failed to load orders. Try again later.
          </div>
        )}

        {!isLoading && !error && (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.length === 0 ? (
                <div className="col-span-full rounded-2xl border border-dashed border-gray-300 p-10 text-center bg-white shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900">
                    No orders yet
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Looks like you haven't placed any orders. Start shopping to
                    see them here.
                  </p>
                  <div className="mt-6">
                    <a
                      href="/"
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md shadow-md hover:from-indigo-700 hover:to-purple-700 custom-button"
                    >
                      Shop now
                    </a>
                  </div>
                </div>
              ) : (
                visible.map((o) => {
                  const id = o._id || o.id;
                  const items = Array.isArray(o.orderItems)
                    ? o.orderItems
                    : Array.isArray(o.items)
                      ? o.items
                      : [];
                  const firstItem = items[0] ?? null;
                  const firstProduct = firstItem
                    ? firstItem.productId ||
                      firstItem.product ||
                      firstItem.product_id ||
                      firstItem
                    : null;
                  const thumbnail =
                    firstProduct?.imageCover?.url ||
                    firstProduct?.image ||
                    firstProduct?.imageUrl ||
                    null;
                  const variant = getStatusVariant(o.status);

                  return (
                    <motion.article
                      key={id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.25 }}
                      aria-labelledby={`order-${id}`}
                      className={` relative bg-white rounded-2xl border border-gray-200 p-5 shadow-md hover:shadow-xl hover:scale-[1.01] transform-gpu transition-all focus-within:ring-2 ${variant.ring}`}
                    >
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl bg-gradient-to-b ${variant.accent}`}
                        aria-hidden
                      />
                      <div className="relative flex items-start gap-4">
                        <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200">
                          {thumbnail ? (
                            <img
                              src={thumbnail}
                              alt={`order ${id} thumb`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <svg
                              className="w-8 h-8 text-gray-300"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                            >
                              <rect
                                x="3"
                                y="3"
                                width="18"
                                height="18"
                                rx="2"
                                ry="2"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <h2
                                id={`order-${id}`}
                                className="text-base sm:text-lg font-semibold text-gray-900 truncate"
                              >
                                Order #{id}
                              </h2>
                              <p className="text-sm text-gray-600 mt-1 truncate">
                                {o.customer_name || "—"} •{" "}
                                {o.customer_phone || "—"}
                              </p>
                              <p className="text-xs text-gray-400 mt-1 hidden sm:block truncate">
                                {o.address || "—"}
                              </p>
                            </div>
                            <div className="flex-shrink-0 text-right space-y-1">
                              <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${variant.badge}`}
                                aria-label={`Status: ${o.status}`}
                              >
                                {o.status}
                              </div>
                              <div className="mt-2 text-lg sm:text-xl font-semibold text-gray-900">
                                {formatEGP(o.totalPrice ?? o.total)}
                              </div>
                              <div className="text-xs text-gray-400">
                                {formatDate(o.created_at)}
                              </div>
                            </div>
                          </div>
                          {items && items.length > 0 && (
                            <div className="mt-4 flex -space-x-2" aria-hidden>
                              {items.slice(0, 4).map((it, idx) => {
                                const prod =
                                  it.productId ||
                                  it.product ||
                                  it.product_id ||
                                  it;
                                const img =
                                  prod?.imageCover?.url ||
                                  prod?.image ||
                                  prod?.imageUrl ||
                                  null;
                                return (
                                  <div
                                    key={it._id || it.id || idx}
                                    className="w-8 h-8 rounded-md border border-white overflow-hidden bg-gray-100"
                                    title={prod?.name || it.name || ""}
                                  >
                                    {img ? (
                                      <img
                                        src={img}
                                        alt={prod?.name || "item"}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                      />
                                    ) : null}
                                  </div>
                                );
                              })}
                              {items.length > 4 && (
                                <div className="w-8 h-8 rounded-md bg-gray-200 text-xs flex items-center justify-center text-gray-600 border border-white font-medium">
                                  +{items.length - 4}
                                </div>
                              )}
                            </div>
                          )}
                          <div className="mt-4 flex items-center gap-3 flex-wrap">
                            <button
                              onClick={() => toggle(id)}
                              className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline custom-button px-3 py-1 rounded-md"
                            >
                              {expanded[id]
                                ? "Hide items"
                                : `Show items (${items.length || 0})`}
                            </button>
                          </div>
                          <AnimatePresence>
                            {expanded[id] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mt-5 border-t border-gray-100 pt-5 space-y-4"
                              >
                                {items.length === 0 ? (
                                  <div className="text-sm text-gray-500">
                                    No items available
                                  </div>
                                ) : (
                                  items.map((it, idx) => {
                                    const prod =
                                      it.productId ||
                                      it.product ||
                                      it.product_id ||
                                      it;
                                    const name =
                                      prod?.name || it.name || "Product";
                                    const qty = it.quantity ?? it.qty ?? 1;
                                    const price = it.price ?? prod?.price ?? 0;
                                    const img =
                                      prod?.imageCover?.url ||
                                      prod?.image ||
                                      prod?.imageUrl ||
                                      null;
                                    return (
                                      <div
                                        key={it._id || it.id || idx}
                                        className="flex items-center gap-4"
                                      >
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                                          {img ? (
                                            <img
                                              src={img}
                                              alt={name}
                                              className="w-full h-full object-cover"
                                              loading="lazy"
                                            />
                                          ) : null}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="text-sm font-medium text-gray-800 truncate">
                                            {name}
                                          </div>
                                          <div className="text-xs text-gray-600">
                                            Qty: {qty} • {formatEGP(price)}
                                          </div>
                                        </div>
                                        <div className="text-sm font-semibold text-gray-800">
                                          {formatEGP((price || 0) * qty)}
                                        </div>
                                      </div>
                                    );
                                  })
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.article>
                  );
                })
              )}
            </section>

            {/* Pagination footer */}
            <footer className="mt-10 flex items-center justify-center gap-4">
              {pagination.totalPages ? (
                <div className="inline-flex items-center gap-3">
                  <button
                    disabled={!pagination.hasPrevPage}
                    className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50 disabled:opacity-50 custom-button"
                  >
                    Previous
                  </button>
                  <div className="text-sm text-gray-700 font-medium">
                    Page {pagination.currentPage || 1} of{" "}
                    {pagination.totalPages}
                  </div>
                  <button
                    disabled={!pagination.hasNextPage}
                    className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50 disabled:opacity-50 custom-button"
                  >
                    Next
                  </button>
                </div>
              ) : (
                <div className="text-sm text-gray-600 font-medium">
                  Showing {orders.length}{" "}
                  {orders.length === 1 ? "order" : "orders"}
                </div>
              )}
            </footer>
          </>
        )}
      </div>

      <div className="flex items-center gap-3 text-center justify-center mt-10 ">
        <button className="inline-flex items-center gap-2 px-13 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 custom-button">
          <span className="text-sm font-medium">
            <Link to="/" className="text-[20px] ">
              🏠 Home
            </Link>
          </span>
        </button>
      </div>
    </>
  );  
}

/* ---------------- Loader (keep as-is) ---------------- */
export async function loader() {
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
    const orders = await getMyOrders();
    return orders;
  
}
