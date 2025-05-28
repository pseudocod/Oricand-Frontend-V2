import { useState, useCallback } from 'react';
import { handleApiResponse } from './axiosInstance';

const useApi = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: apiError } = await handleApiResponse(() => apiFunction(...args));
      
      if (apiError) {
        setError(apiError);
        return { data: null, error: apiError };
      }
      
      return { data, error: null };
    } catch (err) {
      setError(err.message);
      return { data: null, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return {
    execute,
    loading,
    error,
    setError,
  };
};

export default useApi;

// Example usage:
/*
const MyComponent = () => {
  const { execute: fetchProducts, loading, error } = useApi(productService.getProducts);

  useEffect(() => {
    const loadProducts = async () => {
      const { data, error } = await fetchProducts();
      if (data) {
        // Handle successful response
      }
    };
    loadProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  // ...
};
*/ 