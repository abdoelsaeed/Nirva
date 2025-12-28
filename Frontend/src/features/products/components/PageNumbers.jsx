import { useNavigate, useLocation } from "react-router-dom";
function PageNumbers({ totalPages, setCurrentPage, currentPage }) {
        const navigate = useNavigate();
        const location = useLocation();
  return (
    <div className="flex items-center space-x-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => {
            setCurrentPage(page);
            navigate(`${location.pathname}?page=${page}`);
          }}
          className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
            currentPage === page
              ? "bg-[#1672D4] text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default PageNumbers
