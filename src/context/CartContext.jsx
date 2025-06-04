import { createContext, useContext, useState, useCallback, useEffect } from "react";
import axios from "../services/axiosInstance";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ entries: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    const { data } = await axios.get("/cart", { withCredentials: true });
    setCart(data);
  }, []);

  useEffect(() => {
    fetchCart().finally(() => setLoading(false));
  }, [fetchCart]);

  const addToCart = async (product, qty) => {
    await axios.post(
      "/cart/entries",
      {
        productId: product.id,
        quantity: qty,
      },
      { withCredentials: true }
    );
    await fetchCart();
  };

  const updateQuantity = async (entryId, qty) => {
    await axios.put(
      `/cart/entries/${entryId}`,
      { quantity: qty },
      { withCredentials: true }
    );
    await fetchCart();
  };

  const removeEntry = async (entryId) => {
    await axios.delete(`/cart/entries/${entryId}`, { withCredentials: true });
    await fetchCart();
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateQuantity, removeEntry, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
