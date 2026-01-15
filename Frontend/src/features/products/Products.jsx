import { useProduct } from "../../hooks/useProduct";
import Card from "./Card";
import PaginationButtons from "../../ui/PaginationButtons";

function Products({ products }) {
  const { currentPage, items, totalPages, setCurrentPage } =
    useProduct(products);
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          There are no products currently available.{" "}
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          Please come back later or browse other categories to find the products
          you are looking for.
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 ">
        {items?.map((item, index) => (
          <Card key={index} product={item} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 mb-8">
        <PaginationButtons
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}

export default Products;
