import { Product } from "../types/Product.type";
import Api from "./Base";

export async function getProducts(params?: object) {
  return (
    await Api.get<Product[]>("api/products", {
      params,
    })
  ).data;
}

export async function getPopularProducts() {
  return (await Api.get("api/products?is_popular=true")).data;
}

export async function getProductById(id: string) {
  const res = await Api.get<Product>(`api/products/${id}`);
  return res.data;
}

export async function getProductByBrand(brand: string) {
  const res = await Api.get<Product>("api/products?brands=" + brand);
  return res.data;
}

