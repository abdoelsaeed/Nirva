import axiosClient from "./axiosClient";
export async function getProducts(gender, page) {
  const data = await axiosClient.get(`products?gender=${gender}&page=${page}`);
  return data;
}

export async function createProduct(productData) {
  try {
    const data = await axiosClient.post("products", productData, {
      headers: {
        "Content-Type": "multipart/form-data", // Override default Content-Type for FormData
      },
    });
    return data;
  } catch (error) {
    console.error("createProduct error", error);
    // Add better error handling
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}
export async function getProductById(id) {
  try {
    const res = await axiosClient.get(`products/${id}`);

    if (!res?.data) {
      throw new Error("No product found");
    }

    return res.data;
  } catch (error) {
    console.error("getProductById error", error);

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw error;
  }
}
export async function deleteProductById(id) {
  try {
    // Import axios directly to bypass the interceptor that returns only data
    const axios = (await import("axios")).default;
    const RAW_BASE = import.meta.env.VITE_BASE_URL;
    const isDev = import.meta.env.DEV;
    const BASE = isDev
      ? "/api/v1/"
      : RAW_BASE
        ? RAW_BASE.replace(/\/+$/, "") + "/api/v1/"
        : "/api/v1/";
    
    const jwt = localStorage.getItem("jwt");
    const headers = {
      "Content-Type": "application/json",
    };
    if (jwt) {
      headers.Authorization = `Bearer ${jwt}`;
    }

    const res = await axios.delete(`${BASE}products/${id}`, {
      headers,
      withCredentials: true,
      validateStatus: (status) => status >= 200 && status < 300, // Accept 2xx including 204
    });
    
    // 204 No Content means successful deletion
    if (res.status === 204 || res.status === 200) {
      return { success: true, message: "Product deleted successfully" };
    }

    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    console.error("deleteProductById error", error);

    // Handle 204 No Content - this is success! (some axios configs may throw)
    if (error.response?.status === 204) {
      return { success: true, message: "Product deleted successfully" };
    }

    // Handle 404
    if (error.response?.status === 404) {
      throw new Error("Product not found");
    }

    // Handle other API errors
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    // Network or other errors
    if (!error.response) {
      throw new Error("Network error. Please check your connection.");
    }

    throw new Error(error.message || "Failed to delete product");
  }
}
