import { memo } from 'react';
import { useImageLazyLoad } from '../../hooks/useImageLazyLoad';

const LazyImage = ({
  src,
  alt,
  className = '',
  placeholderClassName = '',
  observerOptions = {},
  ...props
}) => {
  const { imgRef, isLoaded, isInView } = useImageLazyLoad(src, observerOptions);

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {!isLoaded && (
        <div 
          className={`absolute inset-0 bg-gray-200 animate-pulse ${placeholderClassName}`}
          aria-hidden="true"
        />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
};

LazyImage.displayName = 'LazyImage';

export default memo(LazyImage); 