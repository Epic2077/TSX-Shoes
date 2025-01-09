import { Product } from "./Product.type";

export type CartItem = {
  productId: number;
  name?: string;
  price?: number;
  images?: string[];
  count: number;
  size: number;
  color: string;
  product?: Product;
};
