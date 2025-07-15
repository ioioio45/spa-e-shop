import { useContext } from "react";
import { CartContext, type CartItem } from "../../context/CartContext";
const BasketElement: React.FC<CartItem> = ({id,title,price,quantity}) =>{
    return <div>{id}</div>
}
const Basket = () => {
    const context = useContext(CartContext);
    return (
        context ? context.cart.map(el => {
            return (
                <BasketElement {...el}/>
            );
        }) :
        null
    )
}
export default Basket;