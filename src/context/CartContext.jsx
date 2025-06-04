import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "../services/axiosInstance";
import { useAuth } from "./UserContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ entries: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    try {
      const { data } = await axios.get("/cart", { 
        withCredentials: true,
        headers: {
          // Only add Authorization header if user is logged in
          ...(!!user && { Authorization: `Bearer ${localStorage.getItem("token")}` })
        }
      });
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart({ entries: [], totalPrice: 0 });
    }
  }, [user]); // Add user as dependency since we use it in the request config

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
      { 
        withCredentials: true,
        headers: {
          ...(!!user && { Authorization: `Bearer ${localStorage.getItem("token")}` })
        }
      }
    );
    await fetchCart();
  };

  const updateQuantity = async (entryId, qty) => {
    await axios.put(
      `/cart/entries/${entryId}`,
      { quantity: qty },
      { 
        withCredentials: true,
        headers: {
          ...(!!user && { Authorization: `Bearer ${localStorage.getItem("token")}` })
        }
      }
    );
    await fetchCart();
  };

  const removeEntry = async (entryId) => {
    await axios.delete(`/cart/entries/${entryId}`, { 
      withCredentials: true,
      headers: {
        ...(!!user && { Authorization: `Bearer ${localStorage.getItem("token")}` })
      }
    });
    await fetchCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeEntry,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
