import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function HighlightedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/featured")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch featured products", err));
  }, []);

  return (
    <section className="w-full px-6 md:px-20 py-20 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-light uppercase tracking-widest text-black">
          Featured Picks
        </h2>
        <p className="mt-4 text-neutral-600 text-sm md:text-base max-w-xl mx-auto">
          Curated blends handpicked for moments that matter. From classics to
          experimental, here are a few you shouldn't miss.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="rounded-xl p-6 w-[280px] md:w-[300px] bg-gradient-to-br from-[#e0f7fa] via-white to-[#e3f2fd] border border-black/10 shadow-md text-black transition-transform hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold uppercase tracking-wide">
                {product.name}
              </h3>
              <span className="text-sm">{product.price} lei</span>
            </div>

            <div className="mt-4 space-y-1 text-xs uppercase tracking-wider text-neutral-700">
              <div>
                <span className="text-neutral-900">Type:</span>{" "}
                <span className="font-medium">{product.type || "Test"}</span>
              </div>
              <div>
                <span className="text-neutral-900">Origin:</span>{" "}
                <span className="font-medium">{product.origin || "Test"}</span>
              </div>
              <div>
                <span className="text-neutral-900">Process:</span>{" "}
                <span className="font-medium">{product.process || "Test"}</span>
              </div>
            </div>

            <Link to={`/products/${product.id}`}>
              <button className="mt-6 w-full text-xs font-medium border border-black py-2 tracking-widest hover:bg-black hover:text-white transition uppercase cursor-pointer">
                Explore
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
