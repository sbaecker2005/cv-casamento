import { Link, NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/65 border-b border-white/40">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl text-brand-coffee-700">
          MonaLisa & João
        </Link>
        <ul className="flex items-center gap-6 text-sm font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition ${isActive ? 'text-brand-sage-600' : 'text-brand-coffee-500 hover:text-brand-sage-600'}`
              }
            >
              Início
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rsvp"
              className={({ isActive }) =>
                `transition ${isActive ? 'text-brand-sage-600' : 'text-brand-coffee-500 hover:text-brand-sage-600'}`
              }
            >
              RSVP
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pix"
              className={({ isActive }) =>
                `transition ${isActive ? 'text-brand-sage-600' : 'text-brand-coffee-500 hover:text-brand-sage-600'}`
              }
            >
              PIX
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
