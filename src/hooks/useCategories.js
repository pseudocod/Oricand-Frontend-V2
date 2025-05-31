import { useState, useEffect } from 'react';
import { fetchAllCategories } from '../services/categoryService';

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchAllCategories();
                setCategories(data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to load categories:', err);
                setError('Failed to load categories');
                setLoading(false);
            }
        };

        loadCategories();
    }, []);

    return { categories, loading, error };
}; 