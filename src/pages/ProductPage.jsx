import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useCategory } from "../hooks/useCategory";
import { motion } from "framer-motion";
import AddToCartBar from "../components/ui/AddToCartBar";
import { useRef, useState, useEffect } from "react";
import CategoryPreview from "../components/ui/CategoryPreview";

export default function ProductPage() {
  const { productId } = useParams();
  const { product, loading: productLoading } = useProduct(productId);
  const { category, loading: categoryLoading } = useCategory(
    product?.categoryId
  );
  const [quantity, setQuantity] = useState(1);
  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const addToCartRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!addToCartRef.current) return;
      const { bottom } = addToCartRef.current.getBoundingClientRect();
      setShowFloatingBar(bottom < 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (productLoading || categoryLoading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-lg animate-pulse">Loading Product...</div>
      </div>
    );
  }

  const featuredImage =
    product.images.find((img) => img.featured) || product.images[0];

  const groupedAttributes = product.attributes.reduce((acc, attr) => {
    if (!acc[attr.attributeName]) acc[attr.attributeName] = [];
    acc[attr.attributeName].push(attr.value);
    return acc;
  }, {});

  const [firstLine, ...restDescriptionLines] = product.description.split("\n");

  return (
    <div className="bg-white text-black">
      {showFloatingBar && (
        <div className="fixed bottom-0 left-0 w-full z-50">
          <AddToCartBar
            onAddToCart={(qty) => console.log("Add to cart", qty)}
          />
        </div>
      )}

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:pl-32 md:pr-0 pt-20 pb-10 max-w-6xl mx-auto">
        {/* LEFT (Text + Button) */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="basis-full md:basis-1/2 min-w-0 flex flex-col justify-center items-center md:items-start text-center md:text-left"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide uppercase mb-4 break-words">
            {product.name}
          </h1>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 max-w-md">
            {firstLine}
          </p>
          <div
            ref={addToCartRef}
            className="mt-8 mb-12 w-full max-w-xs sm:max-w-sm md:max-w-lg"
          >
            <div className="flex items-center justify-center md:justify-start gap-6 flex-wrap">
              <div className="flex items-center border border-black rounded px-2 py-1">
                <button
                  className="text-xl font-medium px-2 cursor-pointer"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </button>
                <span className="text-lg mx-3">{quantity}</span>
                <button
                  className="text-xl font-medium px-2 cursor-pointer"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>

              <button
                className="bg-black text-white text-sm font-bold uppercase tracking-widest px-6 py-2 rounded cursor-pointer hover:bg-gray-800 transition-all"
                onClick={() => console.log("Add to cart", quantity)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>

        {/* RIGHT (Image) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="basis-full md:basis-1/2 min-w-0 flex items-center justify-center"
        >
          <img
            src={`http://localhost:8080${featuredImage.url}`}
            alt={product.name}
            className="w-full max-w-[350px] md:max-w-full h-auto object-contain rounded-lg"
          />
        </motion.div>
      </section>

      <section className="w-full px-6 md:pl-32 md:pr-0 max-w-6xl mx-auto pt-0 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8">
          {Object.entries(groupedAttributes).map(([key, values], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="pl-5 border-l-2 border-black hover:opacity-80 transition">
                <p className="text-xs font-medium uppercase text-neutral-400 tracking-widest mb-1">
                  {key}
                </p>
                <p className="text-xl text-black leading-snug font-light">
                  {values.join(", ")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="w-full px-6 py-12 md:px-12 lg:pl-32 lg:pr-6 text-black max-w-9xl mx-auto">
        {restDescriptionLines.map((line, i) => {
          const words = line.split(" ");
          return (
            <motion.p
              key={i}
              className="text-[1.5rem] md:text-[2rem] leading-[2.4rem] md:leading-[2.8rem] tracking-tight mb-10 flex flex-wrap"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ staggerChildren: 0.05, delayChildren: i * 0.1 }}
            >
              {words.map((word, idx) => (
                <motion.span
                  key={idx}
                  className="mr-2"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          );
        })}
      </section>

      {/* Category Preview */}
      {category && (
        <CategoryPreview
          categoryName={category.name}
          categoryId={category.id}
          videoUrl={
            category.teaserVideoUrl
              ? `http://localhost:8080${category.teaserVideoUrl}`
              : null
          }
        />
      )}
    </div>
  );
}
