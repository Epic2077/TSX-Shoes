import { useContext } from "react";
import { Product } from "../../types/Product.type";
import { CartContext } from "../../providers/CartProvider";

type Props = {
  product: Product;
};

const ProductTotalPrice = ({ product }: Props) => {
  const { cart } = useContext(CartContext);
  const cartItem = cart.find((item) => item.product.id === product.id);
  const totalPrice = cartItem ? cartItem.product.price * cartItem.count : 0;

  return (
    <>
      <div className="flex flex-col items-start justify-start py-3">
        <p className="text-base font-semibold text-[#68717A]">Total price</p>
        <p className="text-3xl font-bold text-[#152536]">
          ${totalPrice.toFixed(2)}
        </p>
      </div>
    </>
  );
};

export default ProductTotalPrice;
