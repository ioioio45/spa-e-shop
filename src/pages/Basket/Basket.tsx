import { useContext } from "react";
import { CartContext, type CartItem } from "../../context/CartContext";
import Button from '../../shared/ui/Button';
const BasketElement: React.FC<CartItem> = ({id,title,price,quantity}) =>{
    const context = useContext(CartContext);
    return (
        <tr className="">
            <th className="px-4 py-2">{id} </th>
            <td className="text-center">{title} </td>
            <td className="text-center">{price} </td>
            <td className="text-center">{quantity} </td>
            <td className="text-center">
                <button onClick={()=>context?.deleteFromCart(id)}className="bg-red-600 hover:bg-red-700 text-white rounded px-3 py-1">X</button>
            </td>
        </tr>
    )
}
const Basket = () => {
    const context = useContext(CartContext);
    let sum = 0;
    context?.cart.forEach(el=>sum+=el.price * el.quantity);
    return (
        <div className="w-full p-4 relative">
            <h1 className="text-3xl font-bold text-center mb-8 font-bold">Корзина</h1>
            <div className="flex justify-center">
                <button className="px-6 py-3 mb-6 h-12 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600"onClick={context?.clearCart}>
                    Очистить корзину
                </button>
            </div>
            <p className="font-bold">Сумма: {sum}</p>
            <table className="w-full mt-8 border text-sm text-left">
                <thead>
                    <tr>
                        <th className="px-4 py-2" scope="col">ID</th>
                        <th className="px-4 py-2 text-center" scope="col">Название</th>
                        <th className="px-4 py-2 text-center" scope="col">Цена</th>
                        <th className="px-4 py-2 text-center" scope="col">Количество</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        context ? context.cart.map(el => {
                            return (
                                <BasketElement key={el.id} {...el}/>
                            );
                        }) :
                        null
                    }
                </tbody>
            </table>
            <div className="mt-6 flex justify-center">
                <p className="bg-blue-800 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600">Оплатить: {sum.toFixed(2)}</p>
            </div>
        </div>
        
    )
}
export default Basket;