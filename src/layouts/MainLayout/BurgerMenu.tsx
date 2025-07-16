import { useState,useRef,useEffect } from 'react';
import { FaBars } from 'react-icons/fa';

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [openContacts, setOpenContacts] = useState(false);

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
    <div className="md:hidden relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-700 hover:text-blue-600 focus:outline-none"
      >
        <FaBars size={20} />
      </button>

      {open && (
        <div className="absolute top-10 left-0 z-50 bg-white border rounded shadow p-4 w-48">
          <ul className="flex flex-col gap-2">
            <li><a href="/" className="font-bold">Домой</a></li>
            <li><a href="/about" className="font-bold font-sans">О нас</a></li>
            <li>
              <div className="relative">
        <button
          onClick={() => setOpenContacts(!openContacts)}
          className="text-indigo-500 font-semibold font-sans"
        >
          Контакты
        </button>

        <div
          className={`absolute top-8 left-0 w-64 rounded-md bg-white text-black shadow-lg p-4 transition-all duration-300 transform origin-top z-100 ${
            openContacts
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <p className="mb-1">📧 nyrgun01@gmail.com</p>
          <p>📞 +7 914 229 69 52</p>
        </div>
      </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
