import { useState, useEffect } from "react";

export default function AttributeOptionForm({
  onSubmit,
  editingOption,
  onCancel,
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (editingOption) {
      setValue(editingOption.value);
    } else {
      setValue("");
    }
  }, [editingOption]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit({ value });
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Attribute value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          {editingOption ? "Update" : "Create"}
        </button>
        {editingOption && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
