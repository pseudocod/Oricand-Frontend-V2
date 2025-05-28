import { useState, useEffect } from "react";

const CategoryForm = ({ onSubmit, editingItem, onCancel }) => {
  const [data, setData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (editingItem) {
      setData({
        name: editingItem.name || "",
        description: editingItem.description || "",
      });
    } else {
      setData({
        name: "",
        description: "",
      });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(data);
    setData({ name: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-10 space-y-6 max-w-xl">
      <h2 className="text-2xl font-medium">
        {editingItem ? "✏️ Edit Category" : "➕ Add New Category"}
      </h2>

      <div className="space-y-4">
        <input
          name="name"
          placeholder="Category Name"
          value={data.name}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        
        <textarea
          name="description"
          placeholder="Description"
          value={data.description}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded h-24 resize-none"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black border transition cursor-pointer"
        >
          {editingItem ? "Update Category" : "Create Category"}
        </button>
        {editingItem && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CategoryForm; 