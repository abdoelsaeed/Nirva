// src/store/useStore.js
import { create } from "zustand";
import { fakeApi } from "../api/fakeApi";
import { getOrders, getOrdersStatusCount, totalSales } from "../../../services/orderApi";
import { createUser } from "../../../services/userApi";
import { createProduct } from "../../../services/productApi";
export const useStore = create((set, get) => ({
  products: [],
  orders: [],
  users: [],
  loadOrders: async () => {
    const orders = await getOrdersStatusCount();
    
    set({ orders });
  },
  // جلب الطلبات مع بيانات الصفحات
  ordersPagination: {},
  loadOrdersWithPagination: async (page = 1) => {
    try {
      const response = await getOrders(page)
      set({
        orders: response.data.orders || [],
        ordersPagination: response.pagination || {},
      });
      return response;
    } catch (error) {
      set({ orders: [], ordersPagination: {} });
      throw error;
    }
  },
  loadUsers: async () => {
    const users = await fakeApi.listUsers();
    set({ users });
  },
  addProduct: async (payload) => {
    const p = await createProduct(payload);
    set((state) => ({ products: [p, ...state.products] }));
    return p;
  },
  addUser: async (payload) => {
    try {
      const user = await createUser(payload);
      if (user) {
        set((state) => ({ users: [user, ...state.users] }));
        return user;
      }
    } catch (error) {
      console.error("addUser Error:", error);
      throw error;
    }
  },
  updateOrderStatus: async (id, status) => {
    const updated = await fakeApi.updateOrderStatus(id, status);
    set((state) => ({
      orders: state.orders.map((o) => (o.id === id ? updated : o)),
    }));
    return updated;
  },
  salesSummary: async (opts = {}) => {
    const { period, value } = opts;
    if (period === "year") {
      return await totalSales(value, null);
    } else {
      // Split "2023-01" into year and month
      const [year, month] = value.split("-");
      return await totalSales(year, month);
    }
  },
}));
