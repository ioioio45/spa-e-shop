import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Закрыть меню при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="relative flex gap-8 items-center text-white">
      <Link to="/" className="hover:text-blue-400 transition">Домой</Link>
      <Link to="/about" className="hover:text-blue-400 transition">О нас</Link>

      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen(!open)}
          className="hover:text-blue-400 transition"
        >
          Контакты
        </button>

        <div
          className={`absolute top-8 right-0 w-64 rounded-md bg-white text-black shadow-lg p-4 transition-all duration-300 transform origin-top z-100 ${
            open
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <p className="mb-1">📧 nyrgun01@gmail.com</p>
          <p>📞 +7 914 229 69 52</p>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
