import LoadingSpinner from './LoadingSpinner';

const LoadingOverlay = ({ children, loading, className = "" }) => {
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

export default LoadingOverlay; 