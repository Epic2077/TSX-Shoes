import React from "react";

interface CartCardProps {
  image: string;
  name: string;
  quantity: number;
  size: number;
  color: string;
  price: number;
  status: string;
  onUpdateQuantity?: (newQuantity: number) => void;
}

const OrderActiveCards: React.FC<CartCardProps> = ({
  image,
  name,
  quantity,
  size,
  color,
  price,
  status,
}) => {
  if (!name) return null;

  return (
    <>
      <div className="bg-slate-50 rounded-[25px] w-full p-2 flex gap-3">
        {/* Product Image */}
        <img
          src={image || "/placeholder.jpg"}
          alt={name || "Product"}
          className="rounded-[25px] min-w-32 h-32 object-cover"
        />

        {/* Product Details */}
        <div className="flex flex-col justify-between w-full gap-2">
          {/* Title and Delete Button */}
          <div className="flex w-full items-center justify-between">
            <h1 className="font-semibold text-[24px] max-w-44 truncate">
              {name}
            </h1>
          </div>

          {/* Color and Size */}
          <div className="flex gap-2 items-center">
            <div
              className={`bg-${color}-700 w-4 h-4 rounded-full`}
              aria-label={`Color: ${color}`}
            />
            <p className="text-xs text-gray-500">{color}</p>
            <span className="text-xs text-gray-500">|</span>
            <p className="text-xs text-gray-500">Size = {size}</p>
            <span className="text-xs text-gray-500">|</span>
            <p className="text-xs text-gray-500">Qty = {quantity}</p>
          </div>
          <div className="flex justify-between items-center py-1.5 px-3 bg-gray-200 rounded-full w-max">
            <p className="text-xs text-black">{status}</p>
          </div>

          {/* Price and Quantity */}
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">
              ${(price * quantity).toFixed(2)}
            </p>
            <div className="flex items-center gap-3 bg-black rounded-full px-2 ml-auto">
              <p className="text-sm text-white p-2">Track Order</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderActiveCards;
