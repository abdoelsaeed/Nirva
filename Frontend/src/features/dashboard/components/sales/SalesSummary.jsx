// src/components/sales/SalesSummary.jsx
import { useState, useCallback } from "react";
import { useStore } from "../../store/useStore";

export default function SalesSummary() {
  const salesSummary = useStore((s) => s.salesSummary);
  const [period, setPeriod] = useState("year");
  const [value, setValue] = useState(
    period === "year"
      ? String(new Date().getFullYear())
      : `${new Date().getFullYear()}-01`
  );
  const [result, setResult] = useState({ total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSales = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      
      const res = await salesSummary({ period, value });
      

      // Handle both direct data and nested data formats
      const salesData = res?.data || res;
      

      setResult(salesData);
    } catch (err) {
      console.error("Failed to fetch sales:", err);
      setError("Failed to load sales data");
    } finally {
      setLoading(false);
    }
  }, [period, value, salesSummary]);

  // Fetch only when user clicks Get (no automatic fetch on mount/change)

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Error Message */}
      {error && (
        <div className="w-full p-3 bg-red-50 text-red-600 text-sm rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Sales Info */}
      <div className="text-center md:text-left">
        <div className="text-gray-500 text-sm mb-1">Total Sales</div>
        <div
          className={`text-3xl font-semibold tracking-wide ${loading ? "text-gray-400" : "text-gray-800"}`}
        >
          {loading ? (
            "Loading..."
          ) : (
            <>
              {(
                (result?.totalSales || result?.data?.totalSales) ??
                0
              ).toLocaleString()}{" "}
              <span className="text-green-600 text-xl">EGP</span>
            </>
          )}
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Period:{" "}
          {period === "year"
            ? `Year ${value}`
            : `${new Date(value + "-01").toLocaleString("default", { month: "long" })} ${value.split("-")[0]}`}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={period}
          onChange={(e) => {
            const newPeriod = e.target.value;
            setPeriod(newPeriod);
            if (newPeriod === "year") {
              setValue(String(new Date().getFullYear()));
            } else {
              setValue(`${new Date().getFullYear()}-01`);
            }
          }}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
        >
          <option value="year">Year</option>
          <option value="month">Month</option>
        </select>

        {period === "year" ? (
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 w-24 text-center"
          />
        ) : (
          <input
            type="month"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
          />
        )}

        <button
          onClick={fetchSales}
          disabled={loading}
          className={`px-4 py-2 font-medium rounded-lg shadow-sm transition-all duration-200 active:scale-95
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
        >
          {loading ? "Loading..." : "Get"}
        </button>
      </div>
    </div>
  );
}
