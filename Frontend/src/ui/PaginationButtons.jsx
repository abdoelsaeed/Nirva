import { useNavigate, useLocation } from "react-router-dom";
import PageNumbers from "../features/products/components/PageNumbers";

function PaginationButtons({
  currentPage,
  setCurrentPage,
  totalPages,
  basePath = "",
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      navigate(`${basePath || location.pathname}?page=${newPage}`);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      navigate(`${basePath || location.pathname}?page=${newPage}`);
    }
  };

  // Don't render if only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 bg-white rounded-xl shadow-lg p-3 sm:p-4 border border-gray-100">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`flex items-center px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            currentPage === 1
              ? "bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200"
              : "bg-[#1672D4] text-white hover:bg-[#0d5bb8] hover:scale-105 hover:shadow-md active:scale-95"
          }`}
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </button>

        {/* Page Numbers */}
        <PageNumbers
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-[#1672D4] text-white hover:bg-[#0d5bb8] hover:scale-105 shadow-md"
          }`}
        >
          Next
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default PaginationButtons;
