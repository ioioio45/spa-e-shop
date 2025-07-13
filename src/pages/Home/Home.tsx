import { Link } from "react-router";
import {useState, useEffect,useRef, useMemo, type InputEventHandler, createContext} from 'react';
import ProductCard from "../../shared/ui/ProductCard";
import SearchBar from "./SearchBar";
import Button from "../../shared/ui/Button";
import { useFetch } from "../../hooks/useFetch";
import {products,categories} from '../../fake-api/mock-api.ts'
import type { ChangeEvent } from "react";
const FAKE_API_URL = '/api/data'




const Home = () => {
    // const {data, isLoading, error} = useFetch({url:FAKE_API_URL});
    const [filterCategory, setFilterCategory] = useState('');
    const [search, setSearch] = useState('');
    
    const filteredProducts = useMemo(()=>{
        return products.filter(item => {
            const titleMatch = item?.title.toLowerCase().includes(search);
            const categoryMatch = filterCategory ? item.category.toLowerCase() === filterCategory.toLowerCase() : true;
            return titleMatch && categoryMatch;
        });
    },[search, filterCategory, products])

    const handleSearch = (e:ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        setSearch(e.target.value.toLowerCase());
    }
    const handleCategoryButtonClick = (category: string) => {
        setFilterCategory(category);
    }
    const handleClearCategory = () => {
        setFilterCategory('');
    };
    const searchRef = useRef<HTMLInputElement>(null);

    // const executeScroll = () => {
    //     if(searchRef.current)
    //         searchRef.current.scrollIntoView({ behavior: "smooth", inline: "center" });
    // }

    const handleAddToCart = (id: number) => {
        console.log("Добавлено в корзину:", id);
    };

    return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
        <section className="place-content-end py-4">
            <form  className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
        <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
            Search
        </label>

        <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                    </svg>
                </div>

            <input
                onChange={handleSearch}
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg 
                    bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Найти товары"
                required
            />
        </div>
    </form>
            <div className="gap-4 flex flex-wrap px-4 py-4 max-w-screen-xl mx-auto justify-center mt-5">
                <p className="p-3">Категории: {filterCategory &&<button className="ml-2 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition" onClick={handleClearCategory}>✕ {filterCategory}</button>}</p>
                {categories?.map(category => {
                    return <Button key={category.id} text={category.name} onClickFunction={handleCategoryButtonClick}></Button>
                })} 
            </div>
        </section>
        <section className="max-w-screen-xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} onAddToCart={handleAddToCart} />
            ))}
        </section>
    </div>
    )
};
export default Home;