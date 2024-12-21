import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import { Product } from "../../types/Product.type";

interface Props {
  product: Product;
  selectedSize: number | null;
  selectedColor: string | null;
}

const ProductButton = ({ product, selectedSize, selectedColor }: Props) => {
  const { dispatch } = useContext(CartContext);

  const handleAddToCart = () => {
    if (selectedSize === null || selectedColor === null) {
      alert("Please select both size and color before proceeding to buy.");
      return;
    }

    dispatch({
      type: "ADD",
      payload: { product, selectedSize, selectedColor },
    });
  };

  return (
    <button
      className="flex items-center justify-center text rounded-full px-10 py-3 gap-3 bg-[#152536]"
      onClick={handleAddToCart}
    >
      <div className="w-6 h-6">
        <img
          src="/src/assets/icons/basket-white.svg"
          alt="basket-icon"
          className="w-full h-full"
        />
      </div>
      <p className="text-2xl font-normal text-white">Add to Cart</p>
    </button>
  );
};

export default ProductButton;
