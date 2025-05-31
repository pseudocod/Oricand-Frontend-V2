import { useState, useEffect } from 'react';
import { fetchProductsByCategoryId } from '../services/productService';

export const useProductsByCategory = (categoryId) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const data = await fetchProductsByCategoryId(categoryId);
                setProducts(data);
            } catch (err) {
                console.error('Failed to load products for category:', err);
                setError('Failed to load products for this category');
            } finally {
                setLoading(false);
            }
        };

        if (categoryId) {
            loadProducts();
        } else {
            setProducts([]);
            setLoading(false);
        }
    }, [categoryId]);

    return { products, loading, error };
}; 