import { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const context = useContext(UserContext);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm text-white hover:text-blue-400 transition"
      >
        <span>Меню</span>
      </button>
      {context?.user ? (
        <div
          className={`absolute right-0 top-12 z-50 w-48 bg-white text-black border rounded shadow-lg transition-all duration-300 transform origin-top-right ${
            open
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <ul className="text-sm py-2">
            <li>
              <a
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                🧍 Профиль
              </a>
            </li>
            <li>
              <a
                href="/basket"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                🛒 Корзина
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 transition text-red-600"
              >
                🚪 Выйти
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <div
          className={`absolute right-0 top-12 z-50 w-48 bg-white text-black border rounded shadow-lg transition-all duration-300 transform origin-top-right ${
            open
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <ul className="text-sm py-2">
            <li>
              <a
                href="auth/login"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                🧍 Войти
              </a>
            </li>
            <li>
              <a
                href="auth/register"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                🛒 Зарегистироваться
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
