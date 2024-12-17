import { useCallback } from "react";
import { Product } from "../types/type";
import { getProductById, getProducts } from "./Api";
import { useApi } from "./UseApi";

export function useProducts() {
  const getAllProducts = useCallback(() => getProducts(), []);

  const {
    data: products,
    isError: isErrorProducts,
    isLoading: isLoadingProducts,
  } = useApi<Product[]>(getAllProducts);

  return {
    products,
    isErrorProducts,
    isLoadingProducts,
  };
}

export function useProduct(productId: number) {
  const getProduct = useCallback(() => getProductById(productId), [productId]);

  const {
    data: product,
    isError: isErrorProduct,
    isLoading: isLoadingProduct,
  } = useApi<Product>(getProduct);

  return {
    product,
    isErrorProduct,
    isLoadingProduct,
  };
}
