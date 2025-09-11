import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface FabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'sm' | 'lg';
  variant?: 'sage' | 'coffee';
  tooltip?: string;
}

export default function Fab({ 
  children, 
  size = 'lg', 
  variant = 'sage', 
  tooltip,
  className = '',
  ...props 
}: FabProps) {
  // Tamanhos: sm = 48px, lg = 56-64px para facilitar toque
  const sizeClasses = {
    sm: 'w-12 h-12',
    lg: 'w-14 h-14'
  };

  // Variantes de cor seguindo a paleta brand
  const variantClasses = {
    sage: 'bg-brand-sage-500 hover:bg-brand-sage-600 focus:ring-brand-sage-700 shadow-brand-sage-500/30',
    coffee: 'bg-brand-coffee-500 hover:bg-brand-coffee-700 focus:ring-brand-coffee-700 shadow-brand-coffee-500/30'
  };

  return (
    <div className="relative group">
      <button
        className={`
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          text-white rounded-full shadow-lg
          focus:outline-none focus:ring-4 
          transition-all duration-200 ease-out
          hover:scale-105 active:scale-95
          flex items-center justify-center
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
      
      {/* Tooltip discreto - aparece ao hover/focus */}
      {tooltip && (
        <div 
          role="tooltip"
          className="
            absolute right-16 top-1/2 -translate-y-1/2
            bg-brand-graphite text-white text-sm
            px-3 py-1 rounded-lg whitespace-nowrap
            opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
            transition-opacity duration-200
            pointer-events-none
            before:content-[''] before:absolute before:left-full before:top-1/2
            before:-translate-y-1/2 before:border-4 before:border-transparent
            before:border-l-brand-graphite
          "
        >
          {tooltip}
        </div>
      )}
    </div>
  );
}

interface FABProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
  position?: 'left' | 'right';
  color?: 'sage' | 'coffee';
}

export function FAB({ to, label, icon, position = 'right', color = 'sage' }: FABProps) {
  const baseColor = color === 'sage'
  ? 'bg-brand-sage-600 hover:bg-brand-sage-500 focus:ring-brand-sage-700'
  : 'bg-brand-coffee-600 hover:bg-brand-coffee-500 focus:ring-brand-coffee-700';
  return (
    <div className={`fixed ${position === 'right' ? 'right-5' : 'left-5'} bottom-5`}>
      <Link
        to={to}
        aria-label={label}
        className={`group relative flex items-center justify-center w-14 h-14 rounded-full text-white shadow-xl transition focus:outline-none focus:ring-4 opacity-80 hover:opacity-100 ${baseColor}`}
      >
        {icon || <span className="text-lg font-semibold">{label[0]}</span>}
        <span
          role="tooltip"
            className="pointer-events-none absolute -top-2 -translate-y-full whitespace-nowrap bg-black/70 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition"
        >
          {label}
        </span>
      </Link>
    </div>
  );
}
