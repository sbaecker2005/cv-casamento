import { ReactNode } from 'react';

interface HeroSectionProps {
  backgroundImage?: string;
  children: ReactNode;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

export default function HeroSection({
  backgroundImage,
  children,
  className = '',
  overlay = true,
  overlayOpacity = 0.4
}: HeroSectionProps) {
  return (
    <section 
      className={`
        relative min-h-[60vh] flex items-center justify-center
        bg-gradient-to-br from-brand-sage-100 to-brand-cream
        ${className}
      `}
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : {}}
    >
      {/* Overlay para melhorar legibilidade do texto */}
      {overlay && backgroundImage && (
        <div 
          className="absolute inset-0 bg-brand-graphite"
          style={{ opacity: overlayOpacity }}
        />
      )}
      
      {/* Conteúdo */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {children}
      </div>
    </section>
  );
}
