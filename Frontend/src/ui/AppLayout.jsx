import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Spinner from "./Spinner";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  if (isLoading) return <Spinner />;
  return (
    <div className="min-h-screen">
      <Header />

      <main className="w-[90%] mx-auto pt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
