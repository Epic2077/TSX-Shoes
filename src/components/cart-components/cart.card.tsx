import React, { useState } from "react";
import { Product } from "../../types/Product.type";

interface CartCardProps {
  product: Product;
}
// bg-gray-700 bg-red-700 bg-teal-700 bg-green-700 bg-yellow-700 bg-rose-700

const CartCard: React.FC<CartCardProps> = ({ product }) => {
  return (
    <>
      <div className="bg-slate-50 rounded-[25px] w-full p-4 flex gap-3">
        <img
          src={product.images}
          alt={product.title}
          className="rounded-[25px] min-w-36 h-36"
        />
        <div className="flex flex-col gap-4 w-full">
          <div className="flex w-full items-center justify-between">
            <h1 className="font-semibold text-[24px]">{product.title}</h1>
            <img
              src="../../../src/assets/icons/trash.svg"
              alt="trash"
              className="w-5"
            />
          </div>
          <div className="flex gap-2">
            <div
              className={`bg-${product.selectedColor}-700 w-4 h-4 rounded-full`}
            ></div>
            <p>{product.selectedColor}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCard;
