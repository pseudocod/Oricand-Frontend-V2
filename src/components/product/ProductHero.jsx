import { motion } from "framer-motion";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../context/UserContext";

export default function ProductHero({
  product,
  quantity,
  setQuantity,
  addToCartRef,
  featuredImage,
}) {
  const { user } = useAuth();
  const { addToCart } = useCart(!!user);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:pl-32 md:pr-0 pt-20 pb-10 max-w-6xl mx-auto">
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
          {product.description.split("\n")[0]}
        </p>
        <div
          ref={addToCartRef}
          className="mt-8 mb-12 w-full max-w-xs sm:max-w-sm md:max-w-lg"
        >
          <div className="flex items-center justify-center md:justify-start gap-6 flex-wrap">
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            <AddToCartButton
              quantity={quantity}
              product={product}
              onAdd={addToCart}
            />
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
  );
}

function QuantitySelector({ quantity, setQuantity }) {
  return (
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
  );
}

function AddToCartButton({ quantity, product, onAdd }) {
  return (
    <button
      className="bg-black text-white text-sm font-bold uppercase tracking-widest px-6 py-2 rounded cursor-pointer hover:bg-gray-800 transition-all"
      onClick={() => onAdd(product, quantity)}
    >
      Add to Cart
    </button>
  );
}
