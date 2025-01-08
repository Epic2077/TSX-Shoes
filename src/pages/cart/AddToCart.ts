import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../api/Base";
import { CartItem } from "../../types/CartItem.type";

export async function addToCart(
  cartItem: CartItem,
  accessToken: string
): Promise<CartItem> {
  const { productId, count, size, color } = cartItem;

  if (!accessToken) {
    throw new Error("Access token is missing. Please log in.");
  }

  try {
    const response = await axios.post<CartItem>(
      `${BASE_URL}/api/cart`,
      { productId, count, size, color },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else {
      console.error("Unexpected error occurred:", error);
    }
    throw new Error("Failed to add item to cart. Please try again.");
  }
}

function handleAxiosError(error: AxiosError): void {
  const status = error.response?.status;
  const data = error.response?.data;

  switch (status) {
    case 400:
      console.error("Bad Request:", data || "Invalid data provided.");
      break;
    case 401:
      console.error("Unauthorized: Access token is invalid or expired.");
      break;
    case 403:
      console.error("Forbidden: You do not have permission to perform this action.");
      break;
    case 404:
      console.error("Not Found: The resource does not exist.");
      break;
    case 500:
      console.error("Internal Server Error: Please try again later.");
      break;
    default:
      console.error("An error occurred:", data || error.message);
  }
}
