import { useEffect, useState } from "react";
import {
  fetchAttributeOptions,
  createAttributeOption,
  updateAttributeOption,
  deleteAttributeOption,
} from "../../services/attributeOptionService";
import toast from "react-hot-toast";
import { useAuth } from "../../context/UserContext";
import AttributeOptionForm from "../../components/admin/forms/AttributeOptionForm";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import AdminRow from "../../components/admin/rows/AdminRow";

export default function AttributeOptionAdmin() {
  const { token } = useAuth();
  const [options, setOptions] = useState([]);
  const [editingOption, setEditingOption] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    try {
      const data = await fetchAttributeOptions();
      setOptions(data);
    } catch {
      toast.error("Failed to load attribute options");
    }
  };

  const handleCreateOrUpdate = async (data) => {
    try {
      if (editingOption) {
        await updateAttributeOption(editingOption.id, data, token);
        toast.success("Attribute option updated");
      } else {
        await createAttributeOption(data, token);
        toast.success("Attribute option created");
      }
      setEditingOption(null);
      loadOptions();
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
      await deleteAttributeOption(pendingDeleteId, token);
      toast.success("Deleted successfully");
      loadOptions();
    } catch {
      toast.error("Delete failed");
    } finally {
      setShowConfirm(false);
      setPendingDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-4xl font-light mb-10">🧩 Attribute Options</h1>

      <AttributeOptionForm
        onSubmit={handleCreateOrUpdate}
        editingOption={editingOption}
        onCancel={() => setEditingOption(null)}
      />

      {options.map((opt) => (
        <AdminRow
          key={opt.id}
          label={opt.value}
          onEdit={() => setEditingOption(opt)}
          onDelete={() => requestDelete(opt.id)}
        />
      ))}

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this attribute option?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
