import { useState } from "react";
import axios from "../services/axiosInstance";

export default function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkout = async (orderData) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.post("/orders", orderData, {
        withCredentials: true,
      });
      await fetchCart();
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || "Checkout failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { checkout, loading, error };
}
