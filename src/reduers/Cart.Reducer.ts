import { CartItem } from "../types/CartItem.type";
import { Product } from "../types/Product.type";
import { saveToStorage } from "../utils/Utils";

export type CartAction = {
  type: "ADD" | "REMOVE";
  payload: {
    product: Product;
    selectedSize: number | null;
    selectedColor: string | null;
  };
};

export function CartReducer(state: CartItem[] = [], action: CartAction): CartItem[] {
  const { type, payload } = action;
  switch (type) {
    case "ADD": {
      const isExist = state.findIndex(
        (item) =>
          item.product.id === payload.product.id &&
          item.selectedSize === payload.selectedSize &&
          item.selectedColor === payload.selectedColor
      ) !== -1;

      if (isExist) {
        return saveCartToStorage(
          state.map((item) =>
            item.product.id === payload.product.id &&
            item.selectedSize === payload.selectedSize &&
            item.selectedColor === payload.selectedColor
              ? { ...item, count: item.count + 1 }
              : item
          )
        );
      } else {
        return saveCartToStorage([
          ...state,
          {
            product: payload.product,
            count: 1,
            selectedSize: payload.selectedSize,
            selectedColor: payload.selectedColor,
          },
        ]);
      }
    }
    case "REMOVE": {
      const item = state.find(
        (item) =>
          item.product.id === payload.product.id &&
          item.selectedSize === payload.selectedSize &&
          item.selectedColor === payload.selectedColor
      );

      if (!item) {
        console.error("wrong product id:", payload.product.id);
        return state;
      }

      const shouldRemove = item.count <= 1;
      if (shouldRemove) {
        return saveCartToStorage(
          state.filter(
            (item) =>
              item.product.id !== payload.product.id ||
              item.selectedSize !== payload.selectedSize ||
              item.selectedColor !== payload.selectedColor
          )
        );
      }
      return saveCartToStorage(
        state.map((item) =>
          item.product.id === payload.product.id &&
          item.selectedSize === payload.selectedSize &&
          item.selectedColor === payload.selectedColor
            ? { ...item, count: item.count - 1 }
            : item
        )
      );
    }
    default:
      console.error("undefined action on cart:", action.type);
      return state;
  }
}

// ======== Save Cart To Storage

function saveCartToStorage(cart: CartItem[]): CartItem[] {
  saveToStorage("cart", cart);
  return cart;
}
