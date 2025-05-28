import { useState } from 'react';
import { LazyImage } from '@/components/shared';

export const ProductImageGallery = ({ images, onFeatureImage }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleFeatureClick = () => {
    if (selectedImage && onFeatureImage) {
      onFeatureImage(selectedImage);
    }
  };

  if (!images?.length) {
    return <div className="text-gray-500">No images available</div>;
  }

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="aspect-square w-full relative rounded-lg overflow-hidden bg-gray-100">
        {selectedImage && (
          <LazyImage
            src={selectedImage.url}
            alt={selectedImage.alt || 'Product image'}
            className="w-full h-full object-cover"
          />
        )}
        {selectedImage && onFeatureImage && !selectedImage.isFeature && (
          <button
            onClick={handleFeatureClick}
            className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            Set as Feature
          </button>
        )}
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => handleImageClick(image)}
            className={`aspect-square relative rounded-md overflow-hidden ${
              selectedImage?.id === image.id ? 'ring-2 ring-black' : ''
            }`}
          >
            <LazyImage
              src={image.url}
              alt={image.alt || 'Product thumbnail'}
              className="w-full h-full object-cover"
            />
            {image.isFeature && (
              <div className="absolute top-1 right-1 bg-black text-white text-xs px-1 rounded">
                Featured
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}; 