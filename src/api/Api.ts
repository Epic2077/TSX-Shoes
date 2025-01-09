import { Product } from "../types/Product.type";
import Api from "./Base";
import { AxiosError } from "axios";

export async function getProducts(params?: object) {
  try {
    console.log("Before API call");
    const response = await Api.get<Product[]>("/api/products", {
      params,
    });
    console.log("API Response:", response);
    return response.data;
  } catch (err) {
    console.error("API Error:", err);
    return [];
  }
}

export async function getPopularProducts() {
  return (await Api.get("api/products?is_popular=true")).data;
}

export async function getProductById(id: string) {
  const res = await Api.get<Product>(`api/products/${id}`);
  return res.data;
}

export async function getProductByBrand(brand: string) {
  try {
    const res = await Api.get<Product>("api/products?brands=" + brand);
    return res.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    console.error("Error fetching products by brand:", {
      status: err.response?.status,
      message: err.response?.data?.message || err.message,
      brand,
    });
    throw error; // or return [] depending on your error handling strategy
  }
}
