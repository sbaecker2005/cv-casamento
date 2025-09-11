import { useState } from 'react';
import OptimizedImage from './OptimizedImage';

interface ImageGalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: ImageGalleryItem[];
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

export default function ImageGallery({ 
  images, 
  className = '', 
  columns = 3 
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  return (
    <>
      {/* Grid de imagens */}
      <div className={`grid ${columnClasses[columns]} gap-4 ${className}`}>
        {images.map((image, index) => (
          <div
            key={index}
            className="
              group cursor-pointer rounded-2xl overflow-hidden
              bg-white/70 shadow-lg hover:shadow-xl
              transition-all duration-300 hover:scale-105
            "
            onClick={() => openModal(index)}
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              className="aspect-square group-hover:scale-110 transition-transform duration-300"
            />
            {image.caption && (
              <div className="p-4">
                <p className="text-sm text-brand-graphite/80 text-center">
                  {image.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal de visualização */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Botão fechar */}
            <button
              onClick={closeModal}
              className="
                absolute top-4 right-4 z-10
                w-10 h-10 bg-white/20 hover:bg-white/30
                rounded-full flex items-center justify-center
                text-white text-xl font-bold
                transition-colors duration-200
              "
              aria-label="Fechar"
            >
              ×
            </button>

            {/* Navegação anterior */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="
                  absolute left-4 top-1/2 -translate-y-1/2 z-10
                  w-12 h-12 bg-white/20 hover:bg-white/30
                  rounded-full flex items-center justify-center
                  text-white text-2xl font-bold
                  transition-colors duration-200
                "
                aria-label="Imagem anterior"
              >
                ‹
              </button>
            )}

            {/* Navegação próxima */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="
                  absolute right-4 top-1/2 -translate-y-1/2 z-10
                  w-12 h-12 bg-white/20 hover:bg-white/30
                  rounded-full flex items-center justify-center
                  text-white text-2xl font-bold
                  transition-colors duration-200
                "
                aria-label="Próxima imagem"
              >
                ›
              </button>
            )}

            {/* Imagem principal */}
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Caption */}
            {images[selectedImage].caption && (
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-white text-lg bg-black/50 rounded-lg px-4 py-2 backdrop-blur-sm">
                  {images[selectedImage].caption}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
