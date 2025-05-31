import ProductBoxPresentation from "../components/admin/cards/ProductBoxPresentation";
import useProducts from "../hooks/useProducts";

export default function AllProducts() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="text-gray-500 text-lg">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="text-red-500 text-lg">{error}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-[1600px] mx-auto">
        <h1 className="text-4xl font-light mb-16 text-center tracking-widest">
          All Products
        </h1>

        {products.length === 0 ? (
          <div className="text-center text-gray-500">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product) => (
              <ProductBoxPresentation key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
