import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  fetchAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/features/admin/services";
import CategoryForm from "@/features/admin/components/forms/CategoryForm";
import { ConfirmDialog } from "@/components/shared/modal";
import CategoryRow from "@/features/admin/components/rows/CategoryRow";

export default function CategoryAdmin() {
  const [categories, setCategories] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchAllCategories();
      setCategories(data);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingItem) {
        await updateCategory(editingItem.id, formData);
        toast.success("Category updated");
      } else {
        await createCategory(formData);
        toast.success("Category created");
      }
      setEditingItem(null);
      loadCategories();
    } catch {
      toast.error("Save failed");
    }
  };

  const requestDelete = (id) => {
    setPendingDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCategory(pendingDeleteId);
      toast.success("Category deleted");
      loadCategories();
    } catch {
      toast.error("Delete failed");
    } finally {
      setShowConfirm(false);
      setPendingDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-4xl font-light mb-10">📚 Category Management</h1>

      <CategoryForm
        onSubmit={handleCreateOrUpdate}
        editingItem={editingItem}
        onCancel={() => setEditingItem(null)}
      />

      {categories.map((cat) => (
        <CategoryRow
          key={cat.id}
          category={cat}
          onEdit={() => setEditingItem(cat)}
          onDelete={() => requestDelete(cat.id)}
        />
      ))}

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this category?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
