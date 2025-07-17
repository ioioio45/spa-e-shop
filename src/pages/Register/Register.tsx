const Register = () => {
  return (
    <div className="container-fluid flex justify-center items-center min-h-screen">
      <form className="p-8 w-full max-w-md bg-gray-900 rounded-xl shadow-md">
        <h1 className="text-2xl text-center mb-6">Зарегистрироваться</h1>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Введите ваш email"
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            placeholder="Введите пароль"
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-xl hover:bg-gray-700 transition"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Register;
