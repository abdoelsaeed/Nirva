import { useProduct } from "../../hooks/useProduct";
import Card from "./Card";
import PaginationButtons from "../../ui/PaginationButtons";

function Products({ products }) {
  const { currentPage, items, totalPages, setCurrentPage } =
    useProduct(products);
    console.log(items[0]._id);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 ">
        {items.map((item, index) => (
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
