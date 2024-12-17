import { Product } from "../types/type";
import Api from "./Base";

export async function getProducts(params?: { id: number }) {
  return (
    await Api.get<Product[]>("/products", {
      params,
    })
  ).data;
}

export async function getProductById(id: number) {
  const res = await Api.get<Product>("/products/" + id);
  return res.data;
}
