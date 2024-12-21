import { CartItem } from "../types/CartItem.type";
import { Product } from "../types/Product.type";
import { saveToStorage } from "../utils/Utils";

export type CartAction = {
  type: "ADD" | "REMOVE";
  payload: Product;
};
export function CartReducer(state: CartItem[], action: CartAction): CartItem[] {
  const { type, payload } = action;
  switch (type) {
    case "ADD": {
      const isExist =
        state.findIndex((item) => item.product.id === payload.id) !== -1;
      if (isExist) {
        return saveCartToStorage(
          state.map((item) =>
            item.product.id === payload.id
              ? { ...item, count: item.count + 1 }
              : item
          )
        );
      } else {
        return saveCartToStorage([...state, { product: payload, count: 1 }]);
      }
    }
    case "REMOVE": {
      const item = state.find((item) => item.product.id === payload.id);

      if (!item) {
        throw new Error("wrong product id");
      }
      const shouldRemove = item.count <= 1;
      if (shouldRemove) {
        return saveCartToStorage(
          state.filter((item) => item.product.id !== payload.id)
        );
      }
      return saveCartToStorage(
        state.map((item) =>
          item.product.id === payload.id
            ? { ...item, count: item.count - 1 }
            : item
        )
      );
    }
    default:
      throw new Error("undefined action on cart");
  }
}

// ======== Save Cart To Storage

function saveCartToStorage(cart: CartItem[]): CartItem[] {
  saveToStorage("cart", cart);
  return cart;
}
