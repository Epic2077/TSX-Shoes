import { useCallback } from "react";
import { Product } from "../types/Product.type";
import { getProductById, getProducts } from "./Api";
import { useApi } from "../hooks/UseApi";

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

// export const useLogin = () => {
//   return useMutation(authenticateUser, {
//     onSuccess: (data) => {
//       const { accessToken } = data;
//       setAuthHeader(accessToken);
//       // Store token in memory, cookie
//     },
//     onError: (error) => {
//       console.error("Login failed: ", error);
//     },
//   });
// };
