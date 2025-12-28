import React, { Suspense, lazy, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorMessage from "./ui/ErrorMessage";
import Spinner from "./ui/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./features/user/authSlice";
import { getMe } from "./services/userApi";
import ProductDetials from "./pages/ProductDetials";
// route loaders (must be imported synchronously for react-router)
import { loader as menLoader } from "./pages/Men";
import {loader as productLoafer} from './pages/ProductDetials'
import { loader as wishlistloader } from "./pages/Wishlist";
import { loader as cartLoader } from "./pages/Cart";
import { loader as myordersLoader } from "./pages/GetMyOrders";
import { loader as profileLoader } from "./pages/Profile";
import { Toaster } from "react-hot-toast";

// Lazy-loaded route components (best-case: large pages & admin/dashboard)
const Home = lazy(() => import("./pages/Home"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Men = lazy(() => import("./pages/Men"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const Signup = lazy(() => import("./features/user/Signup"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./features/user/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const DashboardHome = lazy(() => import("./pages/DashboardHome"));
const GetMyOrders = lazy(() => import("./pages/GetMyOrders"));
// (loaders are imported above)
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorMessage />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorMessage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetials />,
        loader: productLoafer,
      },
      {
        path: "/products",
        children: [
          {
            index: true,
            path: ":men",
            element: <Men />,
            loader: menLoader,
            errorElement: <ErrorMessage />,
          },
          {
            path: "women",
            element: <ComingSoon />,
            errorElement: <ErrorMessage />,
          },
          {
            path: "kids",
            element: <ComingSoon />,
            errorElement: <ErrorMessage />,
          },
          {
            path: "wishlist",
            element: (
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            ),
            loader: wishlistloader,
            errorElement: <ErrorMessage />,
          },
        ],
      },
      {
        path: "/cart",
        element: <Cart />,
        loader: cartLoader,
        errorElement: <ErrorMessage />,
      },
      {
        path: "/my-orders",
        element: (
          <ProtectedRoute>
            <GetMyOrders />
          </ProtectedRoute>
        ),
        errorElement: <ErrorMessage />,
        loader: myordersLoader,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorMessage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorMessage />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
    errorElement: <ErrorMessage />,
    loader: profileLoader,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute requiredRole={"admin"}>
        <DashboardHome />
      </ProtectedRoute>
    ),
    errorElement: <ErrorMessage />,
  },
]);
function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.auth.user);

  useEffect(() => {
    async function bootstrap() {
      try {
        const token = (() => {
          try {
            return localStorage.getItem("jwt");
          } catch (e) {
            return null;
          }
        })();
        if (!token) return;
        if (currentUser) return;
        const user = await getMe();
        if (user) dispatch(setUser(user));
      } catch (e) {
        console.warn("Auth bootstrap failed:", e);
      }
    }
    bootstrap();
  }, [dispatch, currentUser]);
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            marginTop: "60px",
            backgroundColor: "white",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </>
  );
}

export default App;
// requiredRole = "admin";
