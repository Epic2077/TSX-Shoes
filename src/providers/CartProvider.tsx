import React, { createContext, useReducer, PropsWithChildren } from "react";
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
  const initialCartState = () => {
    return getFromStorage<CartItem[]>("cart", []) || [];
  };

  const [cart, dispatch] = useReducer(CartReducer, [], initialCartState);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
