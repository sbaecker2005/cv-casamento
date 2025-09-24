import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageHeroProps {
  title?: string;
  subtitle?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryLabel?: string;
  imageIndex?: number;
  imageSrc?: string;
  imageAlt?: string;
}

const prefersReduced = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

export function ImageHero({
  title = 'MonaLisa & João',
  subtitle = '24 de Agosto de 2025 • Espaço Flor de Lis',
  ctaPrimaryLabel = 'Confirmar Presença',
  ctaSecondaryLabel = 'Chave PIX',
  imageIndex = 0,
  imageSrc = '/images/gallery/img1.jpg',
  imageAlt = 'Foto destaque do casal'
}: ImageHeroProps) {
  // A imagem agora deve ser passada via prop ou futuramente integrando outro módulo.
  // (placeholder de background removido até receber imagens locais)
  return (
  <section className="relative w-full min-h-[45vh] md:min-h-[55vh] lg:min-h-[60vh] max-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Imagem de fundo ajustada para cobrir, com foco levemente acima do centro para rostos */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover object-[70%_35%] pointer-events-none select-none"
        loading="eager"
        decoding="async"
      />
      <div
        aria-label={`Imagem destaque ${(imageIndex + 1)}`}
        className="absolute inset-0 w-full h-full bg-brand-sage-700/35"
      />
  <div className="absolute inset-0 bg-gradient-to-br from-brand-sage-700/70 via-brand-sage-700/55 to-brand-coffee-700/40" />
  {/* Máscara sutil na base para dar contraste sem cobrir o rosto */}
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="relative z-10 max-w-4xl px-6 text-center text-white">
        <AnimatePresence>
          <motion.h1
            initial={prefersReduced ? false : { y: 40, opacity: 0 }}
            animate={prefersReduced ? {} : { y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="text-5xl sm:text-6xl font-serif drop-shadow-lg"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={prefersReduced ? false : { y: 30, opacity: 0 }}
            animate={prefersReduced ? {} : { y: 0, opacity: 1, transition: { delay: 0.15 } }}
            className="mt-6 text-lg sm:text-xl font-light tracking-wide text-white/90"
          >
            {subtitle}
          </motion.p>
          <motion.div
            initial={prefersReduced ? false : { y: 20, opacity: 0 }}
            animate={prefersReduced ? {} : { y: 0, opacity: 1, transition: { delay: 0.3 } }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/rsvp"
              aria-label="Ir para a confirmação de presença (RSVP)"
              className="btn-sage shadow-xl shadow-brand-sage-900/30"
            >
              {ctaPrimaryLabel}
            </Link>
            <Link
              to="/pix"
              aria-label="Ver chave PIX para presentear"
              className="btn-coffee shadow-xl shadow-brand-coffee-900/30"
            >
              {ctaSecondaryLabel}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
