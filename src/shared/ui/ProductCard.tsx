import type { FC } from "react";
import Button from './Button'
import tshirt from '../../assets/t-shirt.png'
type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  category: string;
  onAddToCart?: (id: number) => void;
};

const ProductCard: FC<ProductCardProps> = ({ id, title, price, category, onAddToCart }) => {
    return (
        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.03] bg-white/80 hover:bg-blue-50 dark:bg-gray-800/80 dark:hover:bg-gray-900 flex flex-col">
            <img
                src={tshirt}
                alt={title}
                className={`h-48 object-cover w-full rounded-lg hover:scale-110 transition-all duration-300 hover:-translate-y-1  z-100`}
            />

            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                <p className="text-gray-600 text-sm mb-4 text-white">{price.toFixed(2)} ₽</p>
                <div className="mb-3">
                    <span className="text-sm text-blue-300">Категория: </span>
                    <span className="text-m text-white">{category}</span>
                </div>
                <Button text='В корзину' onClickFunction={() => {onAddToCart?.(id)}}>
                </Button>
            </div>
        </div>
    );
}

export default ProductCard;
