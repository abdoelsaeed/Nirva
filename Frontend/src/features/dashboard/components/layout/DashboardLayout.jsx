// src/components/layout/DashboardLayout.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteProductById } from "../../../../services/productApi";
import { Trash2, X, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

export default function DashboardLayout({ children }) {
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!productId.trim()) {
      toast.error("Please enter a product ID");
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmModal(false);
    setLoading(true);
    try {
      await deleteProductById(productId.trim());
      toast.success("Product deleted successfully");
      setProductId("");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error?.message || "Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 sm:w-72 md:w-80 bg-white border-r h-screen p-4 sm:p-5 md:p-6 overflow-y-auto">
          <div className="font-bold text-xl mb-6 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-lg font-semibold">
              S
            </div>
            <span>Store Admin</span>
          </div>

          <nav className="space-y-2 text-sm">
            <a
              href="#"
              className="flex items-center gap-3 py-3 px-3 rounded-lg transition-colors duration-200 text-gray-700 hover:bg-gray-50 hover:translate-x-0.5"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-medium">Dashboard</span>
            </a>

            {/* Delete Product Form */}
            <form 
              onSubmit={handleSubmit} 
              className="mt-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 space-y-3"
            >
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    Delete Product
                  </h3>
                  <p className="text-xs text-gray-500">
                    Enter product ID
                  </p>
                </div>
              </div>

              {/* Input */}
              <div>
                <input
                  type="text"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  placeholder="Product ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all bg-white placeholder:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={loading}
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading || !productId.trim()}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors duration-200"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </>
                )}
              </button>
            </form>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <header className="flex items-center justify-between mb-6">
            <div className="text-2xl font-semibold">Dashboard</div>
            <div className="flex items-center gap-3">
              <Link to="/">
                <button className="px-3 py-2 bg-white rounded shadow text-sm ">
                  Home
                </button>
              </Link>
              <div className="bg-white p-2 rounded shadow">Admin</div>
            </div>
          </header>
          {children}
        </main>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div 
          className="fixed top-0 left-0 right-0 flex justify-center z-50 p-4 animate-slideDown"
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all border border-gray-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Confirm Deletion
                  </h3>
                  <p className="text-xs text-gray-500">
                    This action cannot be undone
                  </p>
                </div>
              </div>
              <button
                onClick={handleCancelDelete}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              <p className="text-sm text-gray-700 mb-2">
                Are you sure you want to delete the product with ID:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 mb-2.5">
                <code className="text-xs font-mono text-gray-800 break-all">
                  {productId}
                </code>
              </div>
              <div className="flex items-start gap-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-700 font-medium">
                  This will permanently delete the product from the system.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2.5 p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <button
                onClick={handleCancelDelete}
                className="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={loading}
                className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors font-medium flex items-center gap-1.5"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Product</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
