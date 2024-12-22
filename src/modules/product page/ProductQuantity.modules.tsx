import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import { Product } from "../../types/Product.type";

type Props = {
  product: Product;
};

const ProductQuantity = ({ product }: Props) => {
  const { cart, dispatch } = useContext(CartContext);

  const cartSafe = cart || [];

  const productInCart = cartSafe.find(
    (item) => item?.product?.id === product?.id
  );

  return (
    <div className="flex items-center justify-start gap-5 pt-2 pb-3 border-b-2 border-[#ECECEC]">
      <p className="text-2xl font-bold text-[#152536]">Quantity</p>
      <div className="py-1 px-5 flex items-center gap-5 justify-center rounded-full bg-[#ECECEC]">

        <button
          className="text-[#152536] font-bold text-2xl text-center"
          onClick={() => {
            if (productInCart) {
              dispatch({
                type: "REMOVE",
                payload: {
                  product: productInCart.product,
                  selectedSize: productInCart.selectedSize,
                  selectedColor: productInCart.selectedColor,
                },
              });
            }
          }}
          disabled={!productInCart}
        >
          -
        </button>

        <p className="text-2xl font-bold text-[#152536]">
          {productInCart ? productInCart.count : 0}
        </p>

        <button
          className="text-[#152536] font-bold text-2xl text-center"
          onClick={() =>
            dispatch({
              type: "ADD",
              payload: {
                product: product,
                selectedSize: productInCart?.selectedSize || null,
                selectedColor: productInCart?.selectedColor || null,
              },
            })
          }
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductQuantity;
