function Variant({ variants, addVariant, updateVariant, removeVariant }) {
  return (
    <div className="variants col-span-1 md:col-span-2">
      <h4 className="font-medium mb-2">Variants</h4>
      {variants.map((v, i) => (
        <div
          key={i}
          className="flex flex-col sm:flex-row gap-2 mb-2 items-stretch sm:items-center"
        >
          <input
            placeholder="Size"
            value={v.size}
            onChange={(e) => updateVariant(i, "size", e.target.value)}
            className="border p-2 rounded flex-1 min-w-0"
          />
          <input
            placeholder="Color"
            value={v.color}
            onChange={(e) => updateVariant(i, "color", e.target.value)}
            className="border p-2 rounded flex-1 min-w-0"
          />
          <input
            placeholder="Quantity"
            type="number"
            value={v.quantity}
            onChange={(e) =>
              updateVariant(i, "quantity", Number(e.target.value))
            }
            className="border p-2 rounded w-full sm:w-24 md:w-28"
          />
          <button
            type="button"
            onClick={() => removeVariant(i)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded h-10 sm:h-10 md:h-auto md:min-h-[42px] flex items-center justify-center text-xl font-bold transition-colors whitespace-nowrap"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addVariant}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-4 w-full sm:w-auto transition-colors"
      >
        + Add Variant
      </button>
    </div>
  );
}

export default Variant;
