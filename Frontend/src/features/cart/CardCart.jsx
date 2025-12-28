/**
 * CardCart: responsive cart list
 * expects props: items (array) - if not provided uses sampleItems
 */

function formatPrice(v) {
  return v.toLocaleString(undefined, { style: "currency", currency: "EGP" });
}

export default function CardCart({ items, onDeleteItem }) {
  return (
    <div className="w-full">
      {/* header: hidden on small screens */}
      <div className="hidden md:grid md:grid-cols-7 gap-5 mb-5 text-sm md:text-base">
        <div className="font-semibold text-gray-500">PRODUCT</div>
        <div className="font-semibold text-gray-500">PRODUCT NAME</div>
        <div className="font-semibold text-gray-500 text-center">QUANTITY</div>
        <div className="font-semibold text-gray-500 text-center">COLOR</div>
        <div className="font-semibold text-gray-500 text-center">SIZE</div>
        <div className="font-semibold text-gray-500 text-center">PRICE</div>
        <div className="font-semibold text-gray-500 text-center">ACTION</div>
      </div>

      {/* items */}
      <div className="space-y-6">
        {items.map((item) => (
          <article
            key={item._id || item.id}
            className="grid grid-cols-1 md:grid-cols-7 gap-5 items-center border-b pb-4"
          >
            {/* PRODUCT (image) */}
            <div className="flex items-center md:justify-start justify-center">
              <img
                src={item.productId.imageCover.url}
                alt="product"
                className="w-40 md:w-[130px] h-40 md:h-[200px] object-cover rounded-lg bg-gray-100"
              />
            </div>

            {/* PRODUCT NAME */}
            <div className="flex flex-col justify-center text-center md:text-left">
              <span className="font-semibold text-lg md:text-[20px] text-gray-800">
                {item.productId.name}
              </span>
              {item.productId.brand && (
                <span className="text-sm text-gray-500 mt-1">
                  {item.productId.brand}
                </span>
              )}

              {/* mobile-only details row */}
              <div className="mt-3 md:hidden text-sm text-gray-500 space-x-3">
                <span>Qty: {item.quantity}</span>
                <span>·</span>
                <span>{item.color}</span>
                <span>·</span>
              </div>
            </div>

            {/* QUANTITY */}
            <div className="flex items-center justify-center">
              {/* on md show controls; on mobile show simple label */}
              <div className="hidden md:flex items-center gap-2">
                {item.quantity}
              </div>
            </div>

            {/* COLOR */}
            <div className="flex items-center justify-center gap-3">
              <div
                aria-hidden
                className="w-5 h-5 rounded-full border"
                style={{ backgroundColor: item.color || "#ef4444" }}
              />
              <span className="hidden md:inline-block text-sm text-gray-700">
                {item.color}
              </span>
            </div>

            {/* SIZE */}
            <div className="flex items-center justify-center">
              <div className="hidden md:block">{item.size}</div>
              <div className="md:hidden text-sm text-gray-700">
                Size: {item.size}
              </div>
            </div>

            {/* PRICE */}
            <div className="flex flex-col items-center md:items-end justify-center text-center md:text-right">
              <span className="text-lg font-semibold">
                {formatPrice(item.productId.price * item.quantity)}
              </span>

              <span className="text-sm text-gray-500 mt-1">
                {formatPrice(item.productId.price)}
              </span>
            </div>

            {/* DELETE BUTTON */}
            <div className="flex items-center justify-center">
              <button
                onClick={() =>
                  onDeleteItem &&
                  onDeleteItem(item.productId._id || item.id, item)
                }
                className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 rounded-lg hover:bg-red-50"
                title="حذف العنصر"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
