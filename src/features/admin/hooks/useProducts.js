import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/productService";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  /** → GET */
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAllProducts();
      setProducts(data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /** → POST */
  const add = async (payload) => {
    await createProduct(payload);
    toast.success("Product created");
    load();
  };

  /** → PUT */
  const edit = async (id, payload) => {
    await updateProduct(id, payload);
    toast.success("Product updated");
    load();
  };

  /** → DELETE */
  const remove = async (id) => {
    await deleteProduct(id);
    toast.success("Product deleted");
    load();
  };

  return { products, loading, add, edit, remove };
}
