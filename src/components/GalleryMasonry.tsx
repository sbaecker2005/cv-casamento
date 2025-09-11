import { useState, useCallback } from 'react';
import { gallery } from '../lib/gallery';
import { Lightbox } from './Lightbox';

export function GalleryMasonry() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const handleOpen = useCallback((i: number) => {
    setCurrent(i);
    setOpen(true);
  }, []);

  return (
    <section aria-labelledby="galeria-titulo" className="container mx-auto px-4 py-12">
      <h2 id="galeria-titulo" className="text-3xl sm:text-4xl font-serif text-brand-coffee-700 mb-6">
        Nossa Galeria
      </h2>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
  {gallery.map(({ src, name }, i) => (
          <figure
            key={i}
            className="mb-4 break-inside-avoid rounded-2xl overflow-hidden shadow-lg relative group cursor-zoom-in"
          >
            <img
              src={src}
              alt={`Foto ${i + 1} - ${name}`}
              loading="lazy"
              decoding="async"
              className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <button
              type="button"
              aria-label="Ampliar imagem"
              onClick={() => handleOpen(i)}
              className="absolute inset-0 focus:outline-none focus:ring-4 ring-white/60"
            />
          </figure>
        ))}
      </div>
      <Lightbox
        images={gallery.map(g => g.src)}
        index={current}
        open={open}
        onClose={() => setOpen(false)}
        onNavigate={setCurrent}
      />
    </section>
  );
}
