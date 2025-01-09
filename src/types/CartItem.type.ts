import { Product } from "./Product.type";

export type CartItem = {
  productId: number;
  product: Product;
  count: number;
  size: number;
  color: string;
};
