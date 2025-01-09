import { Product } from "./Product.type";

export type CartItem = {
  productId: number;
  count: number;
  size: number;
  color: string;
  product?: Product;
};
