import type { FC } from "react";
import Button from './Button'
export type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  onAddToCart?: (id: number) => void;
};

const ProductCard: FC<ProductCardProps> = ({ id, title, price, description, category,image, onAddToCart }) => {
    return (
        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.03] bg-white/80 hover:bg-blue-50 dark:bg-gray-800/80 dark:hover:bg-gray-900 flex flex-col">
            
            <div className="w-full h-48 bg-white">
                <img
                src={image}
                alt={title}
                className={` w-full h-48 object-contain rounded-lg z-100`}
            />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                <p className="text-md font-thin text-white">{description.slice(0, 80) + '...'}</p>
                <p className="text-gray-600 text-sm mb-4 text-white">{price.toFixed(2)} ₽</p>
                <div className="mb-3">
                    <span className="text-sm text-blue-300">Категория: </span>
                    <span className="text-m text-white">{category}</span>
                </div>
                
            </div>
            <Button text='В корзину' onClickFunction={() => {onAddToCart?.(id)}}>
            </Button>
        </div>
    );
}

export default ProductCard;
