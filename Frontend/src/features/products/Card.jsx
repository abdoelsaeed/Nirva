import { useState, useEffect } from "react";
import CircleSize from "../../ui/CircleSize";
import AddToCardButton from "./components/AddToCardButton";
import AddToWishlistButton from "./components/AddToWishlistButton";
import { useSelector } from "react-redux";
import RemoveFromWishlistButton from "./components/removeFromWishlistButton";
import CircleColors from "./components/CircleColors";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Card({ product, noLove }) {
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const { price, name, imageCover, variants, inStock, _id } = product;
  const [selectedColor, setSelectedColor] = useState("");

  const [selectedSize, setSelectedSize] = useState("");
  // Get unique sizes from variants
  const availableSizes = variants
    ? [...new Set(variants.map((v) => v.size))]
    : ["XS", "S", "M", "L", "XL"];

  // Get unique colors from variants
  const availableColors = variants
    ? [...new Set(variants.map((v) => v.color))]
    : [];
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (successMsg) {
      toast.success(successMsg);
    }
  }, [successMsg]);

  return (
    <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 w-full overflow-hidden flex flex-col group h-full">
      <div
        className="relative  bg-gray-100 w-full aspect-square sm:aspect-[4/5] md:aspect-[3/4] overflow-hidden cursor-pointer"
        style={{ cursor: "pointer" }}
      >
        <img
          src={imageCover.url}
          alt={name}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          style={{ cursor: "pointer" }}
          loading="lazy"
          onClick={() => navigate(`/product/${_id}`)}
        />
        {!inStock && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-2.5 sm:p-3 md:p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2 line-clamp-2 leading-tight">
            {name}
          </h3>

          {/* Sizes Section */}
          {availableSizes.length > 0 && (
            <div className="mb-1.5 sm:mb-2">
              <span className="font-semibold text-gray-700 text-[10px] sm:text-xs md:text-sm mb-1 block">
                Size:
              </span>
              <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
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

          {/* Colors Row */}
          {availableColors.length > 0 && (
            <CircleColors
              availableColors={availableColors}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
            />
          )}

          {/* Price */}
          <p className="font-semibold font-Inter text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2 text-gray-900">
            {price} EGP
          </p>
        </div>

        <div className="mt-auto pt-1.5 sm:pt-2 border-t border-gray-100">
          {/* Buttons Row - Side by Side */}
          <div className="flex gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            {/* Add to Cart Button - Takes remaining space */}
            <AddToCardButton
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              productId={_id}
              isAuthenticated={isAuthenticated}
              product={product}
              successMsg={successMsg}
              setSuccessMsg={setSuccessMsg}
            />
            {/* Wishlist Button - Small or remove to wishList*/}
            {noLove ? (
              <RemoveFromWishlistButton productId={_id} />
            ) : (
              <AddToWishlistButton productId={_id} />
            )}
          </div>

          {/* Stock Status */}
          <div className="text-center">
            <span
              className={`text-[10px] sm:text-xs md:text-sm font-medium ${inStock ? "text-green-600" : "text-red-600"}`}
            >
              {inStock ? "✓ In Stock" : "✗ Out of Stock"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
