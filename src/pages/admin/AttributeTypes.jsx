import { useEffect, useState } from "react";
import {
  fetchAttributeTypes,
  createAttributeType,
  updateAttributeType,
  deleteAttributeType,
} from "../services/attributeTypeService";
import { useAuth } from "../context/UserContext";
import toast from "react-hot-toast";

export default function AttributeTypes() {
  const { token } = useAuth();
  const [types, setTypes] = useState([]);
  const [newName, setNewName] = useState("");
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");

  const loadTypes = async () => {
    try {
      const data = await fetchAttributeTypes();
      setTypes(data);
    } catch {
      toast.error("Failed to load attribute types");
    }
  };

  useEffect(() => {
    loadTypes();
  }, []);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      await createAttributeType({ name: newName }, token);
      setNewName("");
      toast.success("Attribute type created");
      loadTypes();
    } catch {
      toast.error("Failed to create attribute type");
    }
  };

  const handleUpdate = async (id) => {
    if (!editValue.trim()) return;
    try {
      await updateAttributeType(id, { name: editValue }, token);
      setEditing(null);
      toast.success("Updated");
      loadTypes();
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this attribute type?")) return;
    try {
      await deleteAttributeType(id, token);
      toast.success("Deleted");
      loadTypes();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-4xl font-light mb-10">🏷️ Attribute Types</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="New attribute type"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border px-4 py-2 rounded"
        />
        <button
          onClick={handleCreate}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      {types.map((type) => (
        <div
          key={type.id}
          className="border-b py-3 flex justify-between items-center"
        >
          {editing === type.id ? (
            <>
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="border px-3 py-1 rounded w-full max-w-xs"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdate(type.id)}
                  className="text-sm bg-black text-white px-2 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(null)}
                  className="text-sm text-gray-500"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="text-gray-900">{type.name}</span>
              <div className="flex gap-3 text-sm">
                <button
                  onClick={() => {
                    setEditing(type.id);
                    setEditValue(type.name);
                  }}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(type.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
