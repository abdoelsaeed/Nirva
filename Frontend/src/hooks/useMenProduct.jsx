import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getProducts } from "../services/productApi";

export const useMenProduct = (initialProducts, gender = "men") => {
  const location = useLocation();
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);

  // Get current page from URL
  const urlParams = new URLSearchParams(location.search);
  const currentPage = parseInt(urlParams.get("page")) || 1;

  // Fetch products when page changes (only if page is not 1 or if we don't have initial data)
  useEffect(() => {
    // Skip API call if we're on page 1 and have initial data
    if (currentPage === 1 && initialProducts?.data?.products?.length > 0) {
      return;
    }

    let isCancelled = false;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts(gender, currentPage);

        // Only update state if component is still mounted
        if (!isCancelled) {
          setProducts(data);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Error fetching products:", error);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    // Cleanup function
    return () => {
      isCancelled = true;
    };
  }, [currentPage, gender, initialProducts]);

  return { products, loading, currentPage };
};
