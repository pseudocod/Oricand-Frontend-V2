import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../context/UserContext";
import { useCart } from "../../../../hooks/useCart";

export default function CartOverlay({ isOpen, onClose }) {
  const { user } = useAuth();
  const { cart, loading } = useCart(!!user);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[70]"
        onClick={onClose}
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] flex flex-col"
      >
        <div className="flex justify-between items-center px-6 py-5">
          <button onClick={onClose} className="cursor-pointer">
            <XMarkIcon className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-medium">Cart</h2>
          <div className="w-6" />
        </div>

        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            Loading...
          </div>
        ) : cart.entries.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <h3 className="text-2xl font-light tracking-wide uppercase mb-12">
              Your Cart is Empty
            </h3>
            <Link
              to="/products"
              onClick={onClose}
              className="inline-block bg-black text-white px-12 py-3 rounded-sm text-sm uppercase tracking-wider font-medium hover:bg-white hover:text-black transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6">
            {cart.entries.map((entry, idx) => (
              <div
                key={entry.id ?? `guest-${entry.product.id}-${idx}`}
                className="flex items-start gap-4 mb-6"
              >
                <img
                  src={entry.product.featuredImageUrl}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{entry.product.name}</h4>
                  <p className="text-sm text-gray-500">
                    Quantity: {entry.quantity}
                  </p>
                </div>
                <div className="text-right">{entry.totalPriceEntry} lei</div>
              </div>
            ))}

            <div className="border-t pt-4 mt-4 text-right font-semibold">
              Subtotal: {cart.totalPrice} LEI
            </div>

            <Link
              to="/checkout"
              onClick={onClose}
              className="mt-6 block bg-black text-white px-6 py-3 text-center"
            >
              Checkout
            </Link>
          </div>
        )}
      </motion.div>
    </>
  );
}
