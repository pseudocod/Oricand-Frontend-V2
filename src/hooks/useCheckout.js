import { useState } from "react";
import axios from "../services/axiosInstance";

export default function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkout = async ({
    cartId,
    paymentType,
    deliveryAddr,
    invoiceAddr,
  }) => {
    try {
      setLoading(true);
      setError(null);

      const body = {
        cartId,
        paymentType,
        // backend expects either id *or* full dto – pick one
        deliveryAddress: deliveryAddr, // or deliveryAddressId
        invoiceAddress: invoiceAddr, // or invoiceAddressId
      };

      const { data } = await axios.post("/orders", body, {
        withCredentials: true,
      });
      return data; // an OrderResponseDto
    } catch (err) {
      setError(err?.response?.data?.message || "Checkout failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { checkout, loading, error };
}
