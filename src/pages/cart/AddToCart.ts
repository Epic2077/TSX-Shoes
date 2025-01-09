import axios from "axios";
import { CartItem } from "../../types/CartItem.type";

const BASE_URL = "http://localhost:8000";

export const addToCart = async (cartItem: CartItem) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await axios.post(`${BASE_URL}/api/cart`, cartItem, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
