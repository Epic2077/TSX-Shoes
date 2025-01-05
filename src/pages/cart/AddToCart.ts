import axios from "axios";
import { BASE_URL } from "../../api/Base";
import { CartItem } from "../../types/CartItem.type";

export async function addToCart({
  productId,
  count,
  size,
  color,
}: CartItem): Promise<CartItem> {
  try {
    const response = await axios.post<CartItem>(`${BASE_URL}/api/cart`, {
      productId,
      count,
      size,
      color,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add item to cart");
  }
}

