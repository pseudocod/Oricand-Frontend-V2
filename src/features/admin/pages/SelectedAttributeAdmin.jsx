import { useEffect, useState } from "react";
import {
  fetchSelectedAttributes,
  createSelectedAttribute,
  updateSelectedAttribute,
  deleteSelectedAttribute,
} from "../../services/selectedAttributeService";
import { fetchAttributeTypes } from "../../services/attributeTypeService";
import { fetchAttributeOptions } from "../../services/attributeOptionService";
import { useAuth } from "../../context/UserContext";
import toast from "react-hot-toast";

import SelectedAttributeForm from "../../components/admin/forms/SelectedAttributeForm";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import AdminRow from "../../components/admin/rows/AdminRow";

export default function SelectedAttributeAdmin() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [attributeTypes, setAttributeTypes] = useState([]);
  const [attributeOptions, setAttributeOptions] = useState([]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const [attrs, types, options] = await Promise.all([
        fetchSelectedAttributes(),
        fetchAttributeTypes(),
        fetchAttributeOptions(),
      ]);
      setItems(attrs);
      setAttributeTypes(types);
      setAttributeOptions(options);
    } catch {
      toast.error("Failed to load selected attributes");
    }
  };

  const handleCreateOrUpdate = async (data) => {
    try {
      if (editingItem) {
        await updateSelectedAttribute(editingItem.id, data, token);
        toast.success("Updated selected attribute");
      } else {
        await createSelectedAttribute(data, token);
        toast.success("Created selected attribute");
      }
      setEditingItem(null);
      loadAll();
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
      await deleteSelectedAttribute(pendingDeleteId, token);
      toast.success("Deleted");
      loadAll();
    } catch {
      toast.error("Delete failed");
    } finally {
      setPendingDeleteId(null);
      setShowConfirm(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-4xl font-light mb-10">🎛️ Selected Attributes</h1>

      <SelectedAttributeForm
        onSubmit={handleCreateOrUpdate}
        editingItem={editingItem}
        onCancel={() => setEditingItem(null)}
        attributeTypes={attributeTypes}
        attributeOptions={attributeOptions}
      />

      {items.map((item) => (
        <AdminRow
          key={item.id}
          label={`${item.attributeName}: ${item.value}`}
          onEdit={() => setEditingItem(item)}
          onDelete={() => requestDelete(item.id)}
        />
      ))}

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this selected attribute?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
