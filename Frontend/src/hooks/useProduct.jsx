import { useLocation } from "react-router-dom";

import { useState } from "react";

export const useProduct = (products) => {
  const location = useLocation();

  // Get initial page from URL parameters
  const urlParams = new URLSearchParams(location.search);
  const initialPage = parseInt(urlParams.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const items = products?.data?.products || [];
  const totalPages = products?.pagination?.totalPages || 1;


  return {
    currentPage,
    items,
    totalPages,
    setCurrentPage,
  };
};
