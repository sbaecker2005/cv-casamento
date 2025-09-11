import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 p-4">
      <div className="container mx-auto flex justify-center">
        {/* Logotipo/monograma minimalista com fundo translúcido */}
        <Link 
          to="/" 
          className="
            bg-white/40 backdrop-blur-sm
            rounded-full px-6 py-3 shadow-lg
            font-serif text-xl font-bold text-brand-graphite
            hover:bg-white/60 transition-all duration-200
            focus:outline-none focus:ring-4 focus:ring-brand-sage-700/30
          "
        >
          MonaLisa & João
        </Link>
      </div>
    </header>
  );
}
