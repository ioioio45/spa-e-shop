import { Outlet } from "react-router";
import Logo from "./Logo";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import BurgerMenu from "./BurgerMenu";
import styles from "./MainLayout.module.css"
import { useState,useEffect, useRef } from "react";



const MainLayout = () =>{
    const scrollTopRef = useRef<HTMLDivElement>(null);
    const [scrollTop,setScrollTop] = useState(0);
    const [scrollBtnVisibility,setScrollBtnVisibility] = useState(false);

    const handleScrollTop = () =>{
        if(scrollTopRef.current)
            scrollTopRef.current.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
    const handleScroll = () =>{
        const currentScroll = window.scrollY;
        setScrollTop(currentScroll);

        if (currentScroll > 100) {
            setScrollBtnVisibility(true);
        } else {
            setScrollBtnVisibility(false);
        }
    }
    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    },[])
    return (
        <>
            <div ref={scrollTopRef}></div>
            <Header></Header>
            <main>
                <Outlet/>
            </main>
            {scrollBtnVisibility && <button
                onClick={handleScrollTop}
                className="fixed bottom-4 left-4 z-50 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
                aria-label="Scroll to top"
            >
                ⬆
            </button>}
        </>
    );
}

const Header = () =>{
    return (
        <header className={`w-full shadow-md px-4 py-2 flex items-center justify-between bg-gray-900 z-1000 ${styles.header}`}>
            <div className="flex items-center gap-4">
                <BurgerMenu />
                <Logo />
            </div>

            <nav className="hidden md:flex space-x-20 mx-auto justify-center">
                <Navigation />
            </nav>

            <div className="flex items-center gap-4">
                <UserMenu />
            </div>
        </header>
    );
}



export default MainLayout;