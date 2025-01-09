import axios from "axios";
import { BASE_URL } from "../../api/Base";
import { CartItem } from "../../types/CartItem.type";

export async function getFromCart(accessToken: string): Promise<CartItem[]> {
  try {
    const response = await axios.get<CartItem[]>(`${BASE_URL}/api/cart`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items", error);
    throw error;
  }
}
