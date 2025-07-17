import { createContext, useEffect, useState, type FC, type ReactNode } from "react";

interface UserInterface {
    name: string;
    email:string;
    password: string;
}
interface AuthResponse {
    token: string;
}
type User = {
    user: UserInterface | null;
    authUser: (name:string, password:string)=>Promise<AuthResponse>;
    registerUser: (name:string, email:string, password:string)=>Promise<any>;
    login: (user:UserInterface)=>void;
    logout: ()=>void;
}

export const UserContext = createContext<User | null>(null)



export const UserProvider:FC<{children:ReactNode}> = ({children}) => {
    const [user, setUser] = useState<UserInterface | null>(null);

    useEffect(()=>{
        const storedUser = localStorage.getItem('currentUser');
        if(storedUser){
            try {
                setUser(JSON.parse( storedUser));
            }
            catch (error){
                console.error('ошибка загрузки пользователя из localstorage')
            }
        }
    }, []);

    const login = (user: UserInterface) => {
        setUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };
    const authUser = async (username:string, password:string):Promise<AuthResponse> => {
        const credentials = {username:username, password:password};
        const resp = await fetch('https://fakestoreapi.com/users/auth/login', {method: 'POST',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(credentials)});
        if(!resp.ok) throw new Error('Ошибка авторизации');
        const data:AuthResponse = await resp.json();
        return data;
    }
    const registerUser = async(name:string, email:string, password:string):Promise<any>=>{
        const userData = {username:name, email:email, password:password};
        const resp = await fetch('https://fakestoreapi.com/users/', {method: 'POST',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userData)});
        if(!resp.ok) throw new Error('Ошибка регистрации');
        const data = await resp.json();
        return data;
    }
    return <UserContext.Provider value={{user, authUser, registerUser, login, logout}}>
        {children}
    </UserContext.Provider>
}