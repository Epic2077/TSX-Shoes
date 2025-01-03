import { getProductById, getProducts } from "./Api";
import { useQuery } from "react-query";

export function useProducts(params: object) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
}

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById(productId),
  });
}
