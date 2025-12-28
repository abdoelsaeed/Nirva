import { useLoaderData } from "react-router-dom";
import Images from "../ui/Images";
import { getProductById } from "../services/productApi";
import CircleSize from "../ui/CircleSize";
import CircleColors from "../features/products/components/CircleColors";
import { useEffect, useState } from "react";
import AddToCardButton from "../features/products/components/AddToCardButton";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function ProductDetials() {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { product } = useLoaderData();
  const {
    imageCover,
    images: url,
    name,
    price,
    inStock,
    variants,
    _id,
  } = product;
  const { url: imageCoverUrl } = imageCover;
  console.log(imageCoverUrl);
  const availableColors = variants
    ? [...new Set(variants.map((v) => v.color))]
    : [];
  const availableSizes = variants
    ? [...new Set(variants.map((v) => v.size))]
    : ["XS", "S", "M", "L", "XL"];

  useEffect(() => {
    if (successMsg) {
      toast.success(successMsg);
    }
  }, [successMsg]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
            {/* Images Section */}
            <div className="order-1 lg:order-1">
              <Images imageCover={imageCoverUrl} images={url} />
            </div>

            {/* Product Details Section */}
            <div className="order-2 lg:order-2 flex flex-col justify-center space-y-6 sm:space-y-8">
              {/* Product Name */}
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 mb-2 leading-tight">
                  {name}
                </h1>
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-600">
                    {price}
                  </span>
                  <span className="text-lg sm:text-xl  font-medium text-[#00c950]">
                    EGP
                  </span>
                </div>
              </div>

              {/* Stock Status */}
              {inStock !== undefined && (
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`}
                  ></div>
                  <span
                    className={`text-sm font-medium ${inStock ? "text-green-700" : "text-red-700"}`}
                  >
                    {inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              )}

              {/* Description */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  The Nirva Hoodie is crafted with care by a local brand that
                  values quality and style. Soft, warm fabric with a modern fit,
                  perfect for daily wear and casual outings.
                </p>
              </div>

              {/* Color Selection */}
              {availableColors.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 mb-4">
                    Product Color:
                  </p>
                  <CircleColors
                    availableColors={availableColors}
                    selectedColor={selectedColor}
                    onSelectColor={setSelectedColor}
                  />
                </div>
              )}

              {/* Size Selection */}
              {availableSizes.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 mb-4">
                    Product Size:
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {availableSizes.map((size) => (
                      <CircleSize
                        key={size}
                        chosen={size}
                        onClick={() => setSelectedSize(size)}
                        isChosen={selectedSize}
                      >
                        {size}
                      </CircleSize>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <div className="border-t border-gray-200 pt-6 w-full">
                <div className="w-full [&>button]:w-full [&>button]:px-6 [&>button]:py-4 [&>button]:sm:px-8 [&>button]:sm:py-5 [&>button]:md:px-10 [&>button]:md:py-6 [&>button]:text-base [&>button]:sm:text-lg [&>button]:md:text-xl [&>button]:font-semibold [&>button]:rounded-xl">
                  <AddToCardButton
                    selectedColor={selectedColor}
                    selectedSize={selectedSize}
                    productId={_id}
                    isAuthenticated={isAuthenticated}
                    product={product}
                    successMsg={successMsg}
                    setSuccessMsg={setSuccessMsg}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export async function loader({ params }) {
  const { id } = params;
  const product = await getProductById(id);
  return product;
}
export default ProductDetials;
