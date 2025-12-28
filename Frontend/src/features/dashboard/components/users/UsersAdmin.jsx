// src/components/users/UsersAdmin.jsx
import { useState } from "react";
import { useStore } from "../../store/useStore";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import toast from "react-hot-toast";
export default function UsersAdmin() {
  const addUser = useStore((s) => s.addUser);
  const [successMsg, setSuccessMsg] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "admin",
  });

  async function submit(e) {
    e.preventDefault();
    try {
      await addUser({ ...form });
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        role: "admin",
      });
      setSuccessMsg("User created successfully 🎉");
    } catch (err) {
      console.error("Submit addUser failed:", err);
      // اظهار رسالة للمستخدم + اذا السيرفر رجع رسالة نعرضها
      const serverMsg =
        err?.response?.data?.message || err?.response?.data || err?.message;
      toast.error("Failed to add user: " + JSON.stringify(serverMsg));
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="font-semibold text-xl mb-4 text-gray-800 border-b pb-2">
        👤 Manage Admin Users
      </h3>
      {successMsg && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          className="mb-4"
        >
          {successMsg}
        </Alert>
      )}
      <form
        onSubmit={submit}
        className="flex flex-wrap gap-3 items-center mb-6"
      >
        <input
          required
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          className="p-2.5 border border-gray-300 rounded-lg flex-1 min-w-[150px] focus:ring-2 focus:ring-indigo-400 outline-none"
          placeholder="First name"
        />

        <input
          required
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          className="p-2.5 border border-gray-300 rounded-lg flex-1 min-w-[150px] focus:ring-2 focus:ring-indigo-400 outline-none"
          placeholder="Last name"
        />

        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="p-2.5 border border-gray-300 rounded-lg flex-1 min-w-[220px] focus:ring-2 focus:ring-indigo-400 outline-none"
          placeholder="Email"
        />

        <input
          required
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="p-2.5 border border-gray-300 rounded-lg flex-1 min-w-[180px] focus:ring-2 focus:ring-indigo-400 outline-none"
          placeholder="Password"
        />

        <input
          required
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="p-2.5 border border-gray-300 rounded-lg flex-1 min-w-[160px] focus:ring-2 focus:ring-indigo-400 outline-none"
          placeholder="Phone"
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
        >
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
        >
          + Add User
        </button>
      </form>

      {/* You could later list users here */}
      {/* <UsersTable users={users} /> */}
    </div>
  );
}
