import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProductCard({ product, onRefresh }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg p-4">
      <div 
        className="cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.description}</p>
        
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0 }}
          className="overflow-hidden"
        >
          {isExpanded && (
            <div className="pt-4">
              <p className="text-sm text-gray-500">Price: ${product.price}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              {/* Add more product details here */}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 