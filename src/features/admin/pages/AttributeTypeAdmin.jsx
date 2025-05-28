import { useEffect, useState } from "react";
import {
  fetchAttributeTypes,
  createAttributeType,
  updateAttributeType,
  deleteAttributeType,
} from "../../services/attributeTypeService";
import toast from "react-hot-toast";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { useAuth } from "../../context/UserContext";
import AttributeTypeForm from "../../components/admin/forms/AttributeTypeForm.JSX";
import AdminRow from "../../components/admin/rows/AdminRow";

export default function AttributeTypeAdmin() {
  const { token } = useAuth();
  const [types, setTypes] = useState([]);
  const [editingType, setEditingType] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = async () => {
    try {
      const data = await fetchAttributeTypes();
      setTypes(data);
    } catch {
      toast.error("Failed to load attribute types");
    }
  };

  const handleCreateOrUpdate = async (data) => {
    try {
      if (editingType) {
        await updateAttributeType(editingType.id, data);
        toast.success("Attribute type updated");
      } else {
        await createAttributeType(data);
        toast.success("Attribute type created");
      }
      setEditingType(null);
      loadTypes();
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
      await deleteAttributeType(pendingDeleteId);
      toast.success("Deleted successfully");
      loadTypes();
    } catch {
      toast.error("Delete failed");
    } finally {
      setShowConfirm(false);
      setPendingDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-4xl font-light mb-10">📘 Attribute Types</h1>

      <AttributeTypeForm
        onSubmit={handleCreateOrUpdate}
        editingType={editingType}
        onCancel={() => setEditingType(null)}
      />

      {types.map((type) => (
        <AdminRow
          key={type.id}
          label={type.name}
          onEdit={() => setEditingType(type)}
          onDelete={() => requestDelete(type.id)}
        />
      ))}

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this attribute type?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
