import React from "react";
import { Product } from "../../types/Product.type";

interface CartCardProps {
  product: Product;
  quantity: number;
  size: number;
  color: string;
  onUpdateQuantity?: (newQuantity: number) => void;
}

const OrderCards: React.FC<CartCardProps> = ({
  product,
  quantity,
  size,
  color,
}) => {
  if (!product) return null;

  return (
    <>
      <div className="bg-slate-50 rounded-[25px] w-full p-5 flex gap-3">
        {/* Product Image */}
        <img
          src={product.images[0] || "/placeholder.jpg"}
          alt={product.name || "Product"}
          className="rounded-[25px] min-w-32 h-32 object-cover"
        />

        {/* Product Details */}
        <div className="flex flex-col justify-between w-full">
          {/* Title and Delete Button */}
          <div className="flex w-full items-center justify-between">
            <h1 className="font-semibold text-[24px] max-w-44 truncate">
              {product.name}
            </h1>
          </div>

          {/* Color and Size */}
          <div className="flex gap-2 items-center">
            <div
              className={`bg-${color}-700 w-4 h-4 rounded-full`}
              aria-label={`Color: ${color}`}
            />
            <p className="text-sm text-gray-500">{color}</p>
            <span className="text-sm text-gray-500">|</span>
            <p className="text-sm text-gray-500">Size = {size}</p>
          </div>

          {/* Price and Quantity */}
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">
              ${(product.price * quantity).toFixed(2)}
            </p>
            <div className="flex items-center gap-3 bg-gray-200 rounded-full px-2 py-1">
              <p className="text-sm text-black">{quantity}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCards;
