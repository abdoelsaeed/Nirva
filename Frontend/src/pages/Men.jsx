import { useLoaderData } from "react-router-dom";
import { useMenProduct } from "../hooks/useMenProduct";
import { getProducts } from "../services/productApi";
import SelectorsButtons from "../features/products/SelectorsButtons";
import Products from "../features/products/Products";

function Men() {
  const initialProducts = useLoaderData();
  const { products, loading } = useMenProduct(initialProducts, "men");
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-7">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-['Kalnia']">
          Men's Collection
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Discover our curated collection of men's fashion essentials
        </p>
      </div>

      <div className="mb-8">
        <SelectorsButtons />
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1672D4]"></div>
        </div>
      ) : (
        <div className="min-h-[400px]">
          <Products products={products} />
        </div>
      )}
    </div>
  );
}
export async function loader({ request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  const data = await getProducts("men", page);
  return data;
}
export default Men;
