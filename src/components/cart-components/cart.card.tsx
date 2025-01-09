import React, { useState } from "react";
import { Product } from "../../types/Product.type";
import DeleteProductFromCart from "./deleting.product.cart";

interface CartCardProps {
  product: Product;
  quantity: number;
  size: number;
  color: string;
  onUpdateQuantity?: (newQuantity: number) => void;
}

const CartCard: React.FC<CartCardProps> = ({
  product,
  quantity: initialQuantity,
  size,
  color,
  onUpdateQuantity,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteCart, setDeleteCart] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleCloseModal = () => setShowDeleteModal(false);

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
    onUpdateQuantity?.(newQuantity);
  };

  return (
    <>
      <div className="bg-slate-50 rounded-[25px] w-full p-5 flex gap-3">
        {/* Product Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="rounded-[25px] min-w-32 h-32 object-cover"
        />

        {/* Product Details */}
        <div className="flex flex-col justify-between w-full">
          {/* Title and Delete Button */}
          <div className="flex w-full items-center justify-between">
            <h1 className="font-semibold text-[24px] max-w-44 truncate">
              {product.name}
            </h1>
            <button onClick={handleDeleteClick}>
              <img
                src="/src/assets/icons/trash.svg"
                alt="Remove from cart"
                className="w-5 h-5"
              />
            </button>
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
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-6 h-6 flex items-center justify-center rounded-full text-black bg-gray-200"
                disabled={quantity <= 1}
              >
                -
              </button>
              <p className="text-sm text-black">{quantity}</p>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="px-5 bg-white w-full fixed bottom-0 left-0 rounded-t-3xl pb-10 pt-3">
            <div className="w-8 h-[3px] rounded-full mx-auto bg-gray-300 mb-5" />

            <h2 className="text-2xl text-center font-semibold mb-5">
              Remove From Cart?
            </h2>

            <div className="w-full h-[1px] bg-gray-300 mb-5" />

            <div className="flex gap-2">
              <button
                className="w-full bg-gray-300 h-12 text-lg font-semibold rounded-full"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="w-full bg-black text-white h-12 text-lg font-semibold rounded-full"
                onClick={() => {
                  setDeleteCart(true);
                  handleCloseModal();
                }}
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteCart && (
        <DeleteProductFromCart product={product} deletingCart={deleteCart} />
      )}
    </>
  );
};

export default CartCard;
