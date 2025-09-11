import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  lazy?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  fallback = '/images/fallback.jpg',
  lazy = true
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder com blur enquanto carrega */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-brand-sage-100 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand-sage-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Imagem principal */}
      <img
        src={hasError ? fallback : src}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          w-full h-full object-cover transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${className}
        `}
      />
    </div>
  );
}
