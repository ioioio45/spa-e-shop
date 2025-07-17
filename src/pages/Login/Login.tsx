import React, { useContext, useState, type ChangeEvent, type FormEvent, type FormEventHandler } from "react";
import { UserContext } from "../../context/UserContext";
import { TbRuler } from "react-icons/tb";
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const Login = () => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorString, setErrorString] = useState("");
  const authenticateUser = (e: FormEvent) =>{
    e.preventDefault();
    if(!context){
      console.error('Контекст не доступен');
      return;
    }
    validateData(email,password) ? context.login : console.error('ОШИБКА ВАЛИДАЦИИ ДАННЫХ');
  }
  const validateData = (email: string, password: string):boolean => {
    setErrorString("");
    let isValid = true;
    if(!email.toLowerCase().match(emailRegex)){
      setErrorString(prev=>prev+'Почта введена не верно\n');
      isValid = false;
    }

    if(password.length < 8){
      setErrorString(prev=>prev+'Длина пароля должна быть не меньше 8\n');
      isValid = false;
    }

    if(password.length > 20){
      setErrorString(prev=>prev+'Длина пароля должна быть не длиннее 20\n');
      isValid = false;
    }

    return isValid;
  };
  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>):void => {
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>):void => {
    setPassword(e.target.value);
  }

  return (
    <div className="container-fluid flex justify-center items-center min-h-screen">
      <form className="p-8 w-full max-w-md bg-gray-900 rounded-xl shadow-md" onSubmit={authenticateUser}>
        <h1 className="text-2xl text-center mb-6">Войти</h1>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Введите ваш email"
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
            onChange={handleEmailInput}
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
            onChange={handlePasswordInput}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-xl hover:bg-gray-700 transition"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
