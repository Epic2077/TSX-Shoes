import { Product } from "../types/Product.type";
import Api from "./Base";

export async function getProducts(params?: { id: number }) {
  return (
    await Api.get<Product[]>("api/products", {
      params,
    })
  ).data;
}

export async function getProductById(id: number) {
  const res = await Api.get<Product>("api/products/" + id);
  return res.data;
}
