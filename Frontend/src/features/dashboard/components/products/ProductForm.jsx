// src/components/products/ProductForm.jsx
import  { useEffect, useState } from "react";
import { useStore } from "../../store/useStore";
import Variant from "./Variant";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-hot-toast";

export default function ProductForm() {
  const addProduct = useStore((state) => state.addProduct);
  const [successMsg, setSuccessMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    category_id: "",
    season: "All",
    brand: "",
    gender: "men",
    imageCover: null, // File
    images: [], // File[]
  });

  const [variants, setVariants] = useState([]);

  const [loading, setLoading] = useState(false);
  const [coverPreview, setCoverPreview] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
      imagesPreview.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [coverPreview, imagesPreview]);

  function handleCoverChange(e) {
    const file = e.target.files?.[0] ?? null;
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverPreview(file ? URL.createObjectURL(file) : null);
    setForm((s) => ({ ...s, imageCover: file }));
  }

  function handleImagesChange(e) {
    const files = e.target.files ? Array.from(e.target.files) : [];
    imagesPreview.forEach((u) => URL.revokeObjectURL(u));
    setImagesPreview(files.map((f) => URL.createObjectURL(f)));
    setForm((s) => ({ ...s, images: files }));
  }

  function removeImageAt(index) {
    const newFiles = [...form.images];
    newFiles.splice(index, 1);
    const newPreviews = [...imagesPreview];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setForm((s) => ({ ...s, images: newFiles }));
    setImagesPreview(newPreviews);
  }

  function removeCover() {
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverPreview(null);
    setForm((s) => ({ ...s, imageCover: null }));
  }

  // Variant handlers
  function addVariant() {
    setVariants([...variants, { size: "M", color: "", quantity: 1 }]);
  }

  // Initialize with one variant if none exist
  useEffect(() => {
    if (variants.length === 0) {
      addVariant();
    }
  }, []);

  function updateVariant(index, field, value) {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  }

  function removeVariant(index) {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  }

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (!form.imageCover) {
      setError("Please select a cover image");
      return;
    }

    if (!form.name || !form.price ) {
      setError("Please provide name, price, and category ID");
      return;
    }

    // Validate variants
    if (!variants.length) {
      setError("Please add at least one variant");
      return;
    }

    const invalidVariant = variants.find(
      (v) =>
        !v.color ||
        !v.size ||
        v.quantity < 0
    );

    if (invalidVariant) {
      setError(
        "Each variant must have a size, color, and quantity ≥ 0"
      );
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("price", String(form.price));
      fd.append("category_id", "68e00f13194b874c5700ad26");
      fd.append("season", form.season);
      fd.append("brand", form.brand);
      fd.append("gender", form.gender);
      fd.append("variants", JSON.stringify(variants));

      // Always append imageCover since we validated it above
      fd.append("imageCover", form.imageCover);
      if (form.images.length) {
        form.images.forEach((f) => fd.append("images", f));
      }
      await addProduct(fd);
      setSuccessMsg("✅ Product added");


      // reset
      if (coverPreview) URL.revokeObjectURL(coverPreview);
      imagesPreview.forEach((u) => URL.revokeObjectURL(u));
      setCoverPreview(null);
      setImagesPreview([]);
      setForm({
        name: "",
        price: "",
        category_id: "",
        season: "All",
        brand: "",
        gender: "men",
        imageCover: null,
        images: [],
      });
      setVariants([]);
    } catch (err) {
      console.error(err);
      toast.error("❌ Error adding product");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-100"
    >
      <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Add New Product
      </h3>
      {successMsg && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          className="mb-4"
        >
          {successMsg}
        </Alert>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          required
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 outline-none"
        />
        <input
          required
          placeholder="Price (EGP)"
          type="number"
          value={form.price}
          onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
          className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 outline-none"
        />

        {/* Variants */}
        <Variant
          variants={variants}
          updateVariant={updateVariant}
          removeVariant={removeVariant}
          addVariant={addVariant}
        />

        <input
          placeholder="Category ID"
          value={"68ebaf97bf2d123e12de1049"}
          disabled={true}
          onChange={(e) =>
            setForm((s) => ({ ...s, category_id: e.target.value }))
          }
          className="p-3 border border-gray-200 rounded-lg"
        />
        <input
          placeholder="Season"
          value={form.season}
          onChange={(e) => setForm((s) => ({ ...s, season: e.target.value }))}
          className="p-3 border border-gray-200 rounded-lg"
        />
        <input
          placeholder="Brand"
          value={form.brand}
          onChange={(e) => setForm((s) => ({ ...s, brand: e.target.value }))}
          className="p-3 border border-gray-200 rounded-lg"
        />
        <select
          value={form.gender}
          onChange={(e) => setForm((s) => ({ ...s, gender: e.target.value }))}
          className="p-3 border border-gray-200 rounded-lg"
        >
          <option value="men">Men</option>
        </select>

        {/* Error Message */}
        {error && (
          <div className="col-span-1 md:col-span-2 text-red-500 text-sm p-2 bg-red-50 rounded">
            {error}
          </div>
        )}

        {/* Cover Image */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
          <div className="md:col-span-1">
            <label className="font-medium text-gray-700 mb-1 flex items-center">
              Cover Image <span className="text-red-500 ml-1">*</span>
              Cover Image
            </label>
            <label
              htmlFor="cover"
              className="w-full cursor-pointer flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            >
              Choose cover image...
            </label>
            <input
              id="cover"
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="hidden"
            />
            {coverPreview ? (
              <div className="mt-2 flex items-center gap-3">
                <img
                  src={coverPreview}
                  alt="cover preview"
                  className="w-28 h-28 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={removeCover}
                  className="px-3 py-1.5 bg-red-600 text-white rounded-md text-sm"
                >
                  Remove
                </button>
              </div>
            ) : (
              <p className="mt-2 text-sm text-gray-400">No cover selected</p>
            )}
          </div>

          {/* Multiple images */}
          <div className="md:col-span-2">
            <label className="font-medium text-gray-700 mb-1">
              Upload Images
            </label>
            <label
              htmlFor="images"
              className="w-full cursor-pointer flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            >
              Choose images...
            </label>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="hidden"
            />
            {imagesPreview.length > 0 ? (
              <div className="mt-3 flex gap-3 flex-wrap">
                {imagesPreview.map((u, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={u}
                      alt={`preview-${idx}`}
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImageAt(idx)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                      title="Remove"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-gray-400">No extra images</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>

        <button
          type="button"
          onClick={() => {
            if (coverPreview) URL.revokeObjectURL(coverPreview);
            imagesPreview.forEach((u) => URL.revokeObjectURL(u));
            setCoverPreview(null);
            setImagesPreview([]);
            setForm({
              name: "",
              price: "",
              category_id: "",
              season: "All",
              brand: "",
              gender: "men",
              imageCover: null,
              images: [],
            });
            setVariants([]);
          }}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
