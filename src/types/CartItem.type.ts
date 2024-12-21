import { Product } from "./Product.type";

export type CartItem = {
  product: Product;
  count: number;
  selectedSize: number | null;
  selectedColor: string | null;
};
