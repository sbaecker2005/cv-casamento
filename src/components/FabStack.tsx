import { useNavigate } from 'react-router-dom';
import Fab from './Fab';

// Ícones SVG simples inline para evitar dependências externas
const HeartIcon = () => (
  <svg 
    className="w-6 h-6" 
    fill="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const GiftIcon = () => (
  <svg 
    className="w-5 h-5" 
    fill="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-2 .89-2 2v4c0 1.11.89 2 2 2h1v6c0 1.11.89 2 2 2h10c1.11 0 2-.89 2-2v-6h1c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
  </svg>
);

export default function FabStack() {
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile: FAB único no canto inferior direito */}
  <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Fab
          onClick={() => navigate('/rsvp')}
          aria-label="Confirmar presença"
          tooltip="Confirmar presença"
          size="lg"
          variant="sage"
        >
          <HeartIcon />
        </Fab>
      </div>

      {/* Desktop: Pilha vertical centralizada na lateral direita */}
  <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col space-y-3">
        {/* FAB principal: RSVP */}
        <Fab
          onClick={() => navigate('/rsvp')}
          aria-label="Confirmar presença"
          tooltip="Confirmar presença"
          size="lg"
          variant="sage"
        >
          <HeartIcon />
        </Fab>

        {/* FAB secundário: PIX */}
        <Fab
          onClick={() => navigate('/pix')}
          aria-label="Contribuir via PIX"
          tooltip="Presentes via PIX"
          size="sm"
          variant="coffee"
        >
          <GiftIcon />
        </Fab>
      </div>
    </>
  );
}
