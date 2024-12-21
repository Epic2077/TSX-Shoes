import { createContext, PropsWithChildren, useReducer } from "react";
import { CartItem } from "../types/CartItem.type";
import { CartAction, CartReducer } from "../reduers/Cart.Reducer";
import { getFromStorage } from "../utils/Utils";

export const CartContext = createContext<{
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
}>({
  cart: [],
  dispatch: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, dispatch] = useReducer(CartReducer, [], () => {
    return getFromStorage<CartItem[]>("cart", []);
  });
  return (
    <CartContext.Provider
      value={{
        cart,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
