// src/api/fakeApi.js
let products = [];
let orders = [];
let users = [
  { id: "u1", name: "Admin", email: "admin@example.com", role: "admin" },
];

// seed some orders for charts/demo
function seed() {
  const now = Date.now();
  for (let i = 1; i <= 30; i++) {
    orders.push({
      id: "o" + i,
      createdAt: new Date(now - i * 86400000).toISOString(),
      total: Math.round(Math.random() * 500 + 20),
      status: ["pending", "shipped", "cancelled", "returned", "delivered"][
        Math.floor(Math.random() * 5)
      ],
      items: [
        {
          productId: "p1",
          name: "Shirt",
          qty: Math.floor(Math.random() * 3) + 1,
          price: 120,
        },
      ],
    });
  }
}
if (orders.length === 0) seed();

export const fakeApi = {
  createProduct: async (payload) => {
    const id = "p" + (products.length + 1);
    const p = { id, ...payload, createdAt: new Date().toISOString() };
    products.push(p);
    return p;
  },
  listProducts: async () => products,
  createUser: async (payload) => {
    const id = "u" + (users.length + 1);
    const u = { id, ...payload };
    users.push(u);
    return u;
  },
  listUsers: async () => users,
  listOrders: async ({ from, to } = {}) => {
    let res = orders.slice();
    if (from || to) {
      const f = from ? new Date(from) : new Date(0);
      const t = to ? new Date(to) : new Date();
      res = res.filter(
        (o) => new Date(o.createdAt) >= f && new Date(o.createdAt) <= t
      );
    }
    return res;
  },
  updateOrderStatus: async (id, status) => {
    const o = orders.find((x) => x.id === id);
    if (!o) throw new Error("Order not found");
    o.status = status;
    return o;
  },
  salesSummary: async ({ period = "year", value } = {}) => {
    // naive aggregate: sum totals of orders in period (value = year or month)
    const all = orders;
    const total = all.reduce((s, o) => {
      const d = new Date(o.createdAt);
      if (period === "year") {
        if (d.getFullYear() === Number(value)) return s + o.total;
      } else if (period === "month") {
        const [y, m] = value.split("-").map(Number); // "2024-06"
        if (d.getFullYear() === y && d.getMonth() + 1 === m) return s + o.total;
      }
      return s;
    }, 0);
    return { total };
  },
};
