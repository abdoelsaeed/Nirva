// src/pages/DashboardHome.jsx
import DashboardLayout from "../features/dashboard/components/layout/DashboardLayout";
import ProductForm from "../features/dashboard/components/products/ProductForm";
import SalesSummary from "../features/dashboard/components/sales/SalesSummary";
import OrdersOverview from "../features/dashboard/components/orders/OrdersOverview";
import OrdersTable from "../features/dashboard/components/orders/OrdersTable";
import UsersAdmin from "../features/dashboard/components/users/UsersAdmin";

export default function DashboardHome() {
  return (
    <DashboardLayout>
      <div className="grid gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <SalesSummary />
          <OrdersOverview />
          <UsersAdmin />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <OrdersTable />
          </div>
          <div>
            <ProductForm />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
