import { Product } from "../types/Product.type";
import { getProductById, getProducts } from "./Api";
import { useQuery } from "react-query";

export function useProducts(params: Product[]) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(),
  });
}

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById(productId),
  });
}
