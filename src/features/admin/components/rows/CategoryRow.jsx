export default function CategoryRow({ category, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-between border-b py-3">
      <div>
        <div className="font-semibold">{category.name}</div>
        <div className="text-sm text-gray-500">{category.description}</div>
        {category.coverImageUrl && (
          <img
            src={category.coverImageUrl}
            alt="Cover"
            className="w-28 h-auto mt-2 rounded shadow"
          />
        )}
        {category.teaserVideoUrl && (
          <video
            src={category.teaserVideoUrl}
            controls
            className="w-48 mt-2 rounded shadow"
          />
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-black text-white rounded-xs hover:bg-gray-600 cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-500 text-white rounded-xs hover:bg-red-600 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
