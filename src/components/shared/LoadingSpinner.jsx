import { motion } from "framer-motion";

export const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <motion.div
        className={`border-2 border-gray-300 border-t-black rounded-full ${sizes[size]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export const LoadingOverlay = ({ children, loading, className = "" }) => {
  if (!loading) return children;

  return (
    <div className="relative">
      {children}
      <div className={`absolute inset-0 bg-white/80 flex items-center justify-center ${className}`}>
        <LoadingSpinner size="lg" />
      </div>
    </div>
  );
}; 