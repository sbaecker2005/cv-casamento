import { Link, useLocation } from 'react-router-dom';

export default function HomeButton() {
  const { pathname } = useLocation();
  if (pathname === '/') return null;
  return (
    <Link
      to="/"
      aria-label="Ir para Home"
      className="fixed left-5 bottom-5 z-50 rounded-full px-4 py-2 bg-brand-coffee-500 text-white shadow-lg hover:bg-brand-coffee-700 focus:outline-none focus:ring-4 focus:ring-brand-coffee-700"
    >
      Home
    </Link>
  );
}