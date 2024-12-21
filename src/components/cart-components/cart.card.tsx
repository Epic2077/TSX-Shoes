import React, { useState } from "react";
import { Product } from "../../types/Product.type";
import DeleteProductFromCart from "./deleting.product.cart";

interface CartCardProps {
  product: Product;
}
// bg-gray-700 bg-red-700 bg-teal-700 bg-green-700 bg-yellow-700 bg-rose-700

const CartCard: React.FC<CartCardProps> = ({ product }) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteCart, setDeleteCart] = useState<boolean>(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

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
              onClick={handleDeleteClick}
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
      {showDeleteModal && (
        <div>
          <div onClick={handleCloseModal}>
            <DeleteProductFromCart
              product={product}
              deletingCart={deleteCart}
            />
          </div>
          <div className="px-5 bg-white w-full grid gap-5 absolute left-0 bottom-0 opacity-100 z-30 rounded-t-3xl pb-10 pt-3">
            <div className="w-8 h-[3px] rounded-full mx-auto bg-gray-300"></div>
            <h2 className="text-2xl text-center font-semibold">
              Remove From Cart?
            </h2>
            <div className="w-full h-[1px] bg-gray-300"></div>
            <CartCard product={product} />
            <div className="w-full h-[1px] bg-gray-300"></div>
            <div className="flex gap-2">
              <div
                className="w-full bg-gray-300 grid justify-center items-center h-11 text-lg font-semibold rounded-full cursor-pointer"
                onClick={handleCloseModal}
              >
                Cancel
              </div>
              <div
                className="w-full bg-black grid justify-center items-center h-11 text-lg font-semibold text-white rounded-full cursor-pointer"
                onClick={() => setDeleteCart(true)}
              >
                Yes, Remove
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartCard;
