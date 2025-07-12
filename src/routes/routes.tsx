import { lazy } from "react";

import MainLayout from "../layouts/MainLayout/MainLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";

const Home = lazy(()=> import( "../pages/Home/Home"))
const Profile = lazy(()=> import( "../pages/Profile/Profile"))
const Login = lazy(()=> import( "../pages/Login/Login"))
const About = lazy(()=> import("../pages/About/About"))

export const routes = [
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {path: '', element: <Home/>},
            {path: 'profile', element: <Profile/>},
            {path: 'about', element: <About/>},
            {path: 'basket', element: <About/>}
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            {path: 'login', element: <Login />}
        ]
    },
];