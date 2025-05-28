import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ProductForm } from "@/features/admin/products/components";
import { ProductCard } from "@/features/admin/components/cards";
import { ConfirmDialog } from "@/components/shared/modal";
import {
  fetchAllProducts,
  deleteProduct,
  updateProduct,
  createProduct
} from "@/features/admin/services";

export default function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchAllProducts();
      setProducts(data);
    } catch {
      toast.error("Failed to load products");
    }
  };

  const handleEdit = (product) => {
    setEditingItem(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const requestDelete = (id) => {
    setPendingDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(pendingDeleteId);
      toast.success("Product deleted");
      loadProducts();
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setShowConfirm(false);
      setPendingDeleteId(null);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingItem) {
        await updateProduct(editingItem.id, formData);
        toast.success("Product updated");
      } else {
        await createProduct(formData);
        toast.success("Product created");
      }
      loadProducts();
      setEditingItem(null);
    } catch (err) {
      toast.error("Failed to submit product");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-4xl font-light mb-10">🛠️ Product Management</h1>

      <ProductForm
        onSubmit={handleSubmit}
        editingItem={editingItem}
        onCancel={() => setEditingItem(null)}
      />

      {products.map((product) => (
        <div
          key={product.id}
          className="border border-gray-200 rounded-lg shadow-sm mb-10 p-6"
        >
          <ProductCard product={product} onRefresh={loadProducts} />
          <div className="flex gap-2 mb-10 mt-10">
            <button
              onClick={() => handleEdit(product)}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700 cursor-pointer"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => requestDelete(product.id)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this product?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
