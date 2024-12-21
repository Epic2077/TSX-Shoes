import React from "react";
import { Product } from "../../types/Product.type";
import DeleteProductFromCart from "./deleting.product.cart";

interface CartCardProps {
  product: Product;
}
// bg-gray-700 bg-red-700 bg-teal-700 bg-green-700 bg-yellow-700 bg-rose-700

const CartCard: React.FC<CartCardProps> = ({ product }) => {
  return (
    <>
      <div className="bg-slate-50 rounded-[25px] w-full p-5 flex gap-3">
        <img
          src={product.images}
          alt={product.title}
          className="rounded-[25px] min-w-32 h-32"
        />
        <div className="flex flex-col justify-between w-full">
          <div className="flex w-full items-center justify-between">
            <h1 className="font-semibold text-[24px]">{product.title}</h1>
            <img
              src="../../../src/assets/icons/trash.svg"
              alt="trash"
              className="w-5"
              onClick={() => DeleteProductFromCart(product)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <div
              className={`bg-${product.selectedColor}-700 w-4 h-4 rounded-full`}
            ></div>
            <p className="text-sm text-gray-500">{product.selectedColor}</p>
            <p className="text-sm text-gray-500">|</p>
            <p className="text-sm text-gray-500">
              Size = {product.selectedSize}
            </p>
          </div>
          <div className="flex">
            <p className="text-xl font-semibold">${product.price}.00</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCard;
