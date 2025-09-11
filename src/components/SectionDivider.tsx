interface SectionDividerProps {
  flip?: boolean;
  className?: string;
  colorClass?: string;
}

export function SectionDivider({ flip, className = '', colorClass = 'fill-brand-coffee-300/50' }: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''} ${className}`}
    >
      <svg
        className="w-full h-24 mix-blend-multiply"
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          className={colorClass}
          d="M0 0h1440v54.24c-56.4 18.24-168 54.72-336 54.72-252 0-294-72-546-72C318 36.96 234 72 0 108V0Z"
        />
      </svg>
    </div>
  );
}
