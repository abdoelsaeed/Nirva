import axiosClient from "./axiosClient";
export async function createOrder(orderData) {
  try {
    const data = await axiosClient.post("orders", 
      orderData,
    );
    return data;
  } catch (error) {
    console.error("createOrder error", error);
    throw error;
  }
}
export async function createOrderGuest(orderData) {
  try {
    const data = await axiosClient.post("orders/guest", orderData);
    return data;
  } catch (error) {
    console.error("createOrderGuest error", error);
    throw error;
  }
}
export async function totalSales(year, month) {
  try {
    // فقط أبني الكويري لو في قيمة موجودة
    const queryParams = new URLSearchParams();
    if (year) queryParams.append("year", year);
    if (month) queryParams.append("month", month);

    const url = `orders/total/sales${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const { data } = await axiosClient.get(url);
    return data;
  } catch (error) {
    console.error("totalSales error", error);
    throw error;
  }
}

export async function getOrdersStatusCount(){
  try {
    const data = await axiosClient.get("orders/stats/overview");
    
    return data;
  }
  catch (error) {
    console.error("getOrdersStatusCount error", error);
    throw error;
  }
}

// services/orderApi.js

export async function getOrders(page = 1, params = {}) {
  try {
    const queryParams = new URLSearchParams();

    // always include page
    queryParams.append("page", page);

    // optional params supported: limit, q, status, sort, etc.
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.q) queryParams.append("q", params.q);
    if (params.status) queryParams.append("status", params.status);
    if (params.sort) queryParams.append("sort", params.sort);
    // add more params here if needed

    // ensure the path matches your axiosClient baseURL (no leading slash if axiosClient already has it)
    const response = await axiosClient.get(`orders?${queryParams.toString()}`);

    // return the full axios response so callers can use response.data, response.status, etc.
    return response;
  } catch (error) {
    console.error("getOrders error", error);
    throw error;
  }
}


export async function updateOrderStatus(orderId, status){
  try {
    const data = await axiosClient.patch(`orders/${orderId}/status`, { status });
    return data;
  } catch (error) {
    console.error("updateOrderStatus error", error);
    throw error;
  }}

export async function getMyOrders(){
  try {
    const data = await axiosClient.get("orders/my/orders");
    return data;
  } catch (error) {
    console.error("getMyOrders error", error);
    throw error;
  }
}