import {useState, useEffect,useRef, useMemo, type InputEventHandler, createContext, useContext} from 'react';
import ProductCard from "../../shared/ui/ProductCard";
import SearchBar from "./SearchBar";
import Button from "../../shared/ui/Button";
import { useFetch } from "../../hooks/useFetch";
//import {products,categories} from '../../fake-api/mock-api.ts'
import type { ChangeEvent } from "react";
import type {ProductCardProps} from '../../shared/ui/ProductCard.tsx'
import type { JSX } from "react/jsx-runtime";
import { BeatLoader } from "react-spinners";
import { CartContext } from "../../context/CartContext.tsx";
import type {CartItem} from '../../context/CartContext.tsx'
const FAKE_API_URL = 'https://fakestoreapi.com/products'


const Home = () => {
    const context = useContext(CartContext);
    
    const {data, isLoading, error} = useFetch<ProductCardProps[]>({url:FAKE_API_URL});
    
    const [filterCategory, setFilterCategory] = useState('');
    const [search, setSearch] = useState('');
    
    const getCategories = useMemo(()=>{
        if (!data) return [];
         return [...new Set(data.map(product => product.category))];
    }, [data])

    const filteredProducts = useMemo(()=>{
        if(!data) return [];
        return data.filter(item => {
            const titleMatch = item?.title.toLowerCase().includes(search);
            const categoryMatch = filterCategory ? item.category.toLowerCase() === filterCategory.toLowerCase() : true;
            return titleMatch && categoryMatch;
        });
    },[search, filterCategory, data])

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

    const handleAddToCart = (id: number) => {
        if(!data || !context) return;
        const item = data.find(product => product.id === id);
        if(!item) return;
        const cartItem: CartItem = {id: item.id, title:item.title,price:item.price,quantity: 1};
        context?.addToCart(cartItem, 1);
        if(context)
        console.log(context.cart);
    };

    return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
        <section className="place-content-end py-4">
            <form  className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>

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
                <p className="p-3">Категории: </p>
                {getCategories?.map((category, index) => {
                    return <Button key={index} text={category} onClickFunction={handleCategoryButtonClick}></Button>
                })} 
            </div>
            <div className="flex justify-center my-2">
                {filterCategory && (
                    <button 
                    className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={handleClearCategory}
                    >
                    ✕ {filterCategory}
                    </button>
                    
                )||<button 
                    className="px-2 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                    >
                        Не выбраны категории
                    </button>
                }
            </div>
        </section>
        <section className="max-w-screen-xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data ? 
            filteredProducts.map((product: JSX.IntrinsicAttributes & ProductCardProps) => (
                <ProductCard key={product.id} {...product} onAddToCart={handleAddToCart} />
            )) : isLoading ? 
            <div className="flex justify-center my-4 w-full">
                <BeatLoader 
                color="#36d7b7"
                loading={isLoading}
                size={15}
                margin={2}
                aria-label="Loading Spinner"
                data-testid="loader"
                className="grow-2"/>
            </div>: error ?
            'Невозможно загрузить данные' :
            'Возникла какая-то ошибка'
            }
        </section>
    </div>
    )
};
export default Home;