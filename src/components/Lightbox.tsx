import { useEffect, useRef } from 'react';

interface LightboxProps {
  images: string[];
  index: number;
  open: boolean;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
  buildAlt?: (src: string, i: number) => string;
}

export function Lightbox({ images, index, open, onClose, onNavigate, buildAlt }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      dlg.showModal();
    } else if (!open && dlg.open) {
      dlg.close();
    }
  }, [open]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((index + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length);
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, index, images.length, onClose, onNavigate]);

  if (!open) return null;

  const src = images[index];

  return (
    <dialog
      ref={dialogRef}
      aria-label="Visualização ampliada da imagem"
      className="backdrop:bg-black/80 p-0 bg-transparent w-full max-w-none h-full overflow-hidden"
    >
      <div className="w-full h-full flex flex-col">
        <div className="flex items-center justify-between p-4 text-white">
            <span className="text-sm font-medium">{index + 1} / {images.length}</span>
            <div className="flex gap-2">
              <button
                aria-label="Fechar lightbox"
                onClick={onClose}
                className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 transition text-sm"
              >Fechar</button>
            </div>
        </div>
        <div className="flex-1 flex items-center justify-center px-4 pb-6">
          <button
            aria-label="Imagem anterior"
            onClick={() => onNavigate((index - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white"
          >&larr;</button>
          <img
            src={src}
            alt={buildAlt ? buildAlt(src, index) : `Imagem ${index + 1}`}
            loading="eager"
            decoding="async"
            className="max-h-[75vh] w-auto max-w-[90vw] rounded-xl shadow-2xl object-contain"
          />
          <button
            aria-label="Próxima imagem"
            onClick={() => onNavigate((index + 1) % images.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white"
          >&rarr;</button>
        </div>
      </div>
    </dialog>
  );
}
