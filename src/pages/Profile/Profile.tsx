const ProfilePage = () => {
  const user = {
    name: 'Иван Петров',
    email: 'ivan@example.com',
    avatar: 'https://i.pravatar.cc/100',
    joined: '2024-11-01',
  };

  return (
    <main className="max-w-screen-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Профиль</h1>

      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full border object-cover"
        />

        <div className="flex-1">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>

          <p className="text-sm text-gray-400">Зарегистрирован: {new Date(user.joined).toLocaleDateString('ru-RU')}</p>
        </div>
      </div>

      <div className="mt-8">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Редактировать профиль
        </button>
      </div>
    </main>
  );
};

export default ProfilePage;
