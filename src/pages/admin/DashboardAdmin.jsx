import { Link } from "react-router-dom";

const adminPages = [
  {
    name: "Products",
    path: "/admin/products",
    emoji: "🛒",
    description: "Manage coffee and merchandise products",
  },
  {
    name: "Categories",
    path: "/admin/categories",
    emoji: "📦",
    description: "Define drops and thematic collections",
  },
  {
    name: "Attribute Types",
    path: "/admin/attribute-types",
    emoji: "🏷️",
    description: "Create product characteristics",
  },
  {
    name: "Attribute Options",
    path: "/admin/attribute-options",
    emoji: "⚙️",
    description: "Configure options per type",
  },
  {
    name: "Selected Attributes",
    path: "/admin/selected-attributes",
    emoji: "✅",
    description: "Assign options to products",
  },
];

export default function DashboardAdmin() {
  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-4xl font-light mb-10">🧭 Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminPages.map((page) => (
          <Link
            key={page.path}
            to={page.path}
            className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition group cursor-pointer"
          >
            <div className="text-3xl mb-4 group-hover:scale-105 transition-transform">
              {page.emoji}
            </div>
            <div className="text-xl font-medium mb-1">{page.name}</div>
            <div className="text-sm text-gray-600">{page.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
