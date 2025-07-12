import { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // иконка, можно любую
import styles from './MainLayout.module.css';

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);

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
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li><a href="/about" className="hover:text-blue-600">About</a></li>
            <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
