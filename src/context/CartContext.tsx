import { useState, useEffect, createContext, useContext} from "react";
import  type {FC} from 'react'
export interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
}
interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem, quantity: number)=>void;
    deleteFromCart: (id:number)=>void;
    clearCart: ()=>void;
}

export const CartContext = createContext<CartContextType|undefined>(undefined);

export const CartProvider:FC<{children: React.ReactNode}> = ({children})  =>{
    const [cart, setCart] = useState<CartItem[]>([]);
    useEffect(()=>{
        const savedCart = localStorage.getItem('cart');
        if(savedCart){
            setCart(JSON.parse(savedCart));
    }
    },[]);
    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart))
    },[cart]);

    const addToCart = (item: CartItem, quantity: number = 1) => {
        setCart(prev => {
            const existingItem = prev.find((el)=>el.id === item.id);

            if(existingItem){
                return prev?.map(el=>el.id === item.id ? {...el, quantity: el.quantity+quantity}:el);
            }
            return [...prev, {...item, quantity}]
        });
    };

    const deleteFromCart = (id: number) => {
        setCart(prev => {
            return prev.filter(el => el.id !== id);
        });
    }

    const clearCart = () =>{
        setCart([]);
    }
    return (
        <CartContext.Provider value={{cart, addToCart, deleteFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart должен использоваться в пределах CartProvider');
    }
    return context;
};
