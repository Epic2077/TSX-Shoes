import React from "react";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getFromCart } from "../../pages/cart/GetFromCart";
import { RootState } from "../../store";
import CartCard from "./cart.card";
import { LoadingSpinner } from "../loading-spinner/loading";
import { CartItem } from "../../types/CartItem.type";
import { handleAuthError } from "../../utils/handleAuthError";
import { BASE_URL } from "../../api/Base";

const CartContainer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.token);

  const {
    data: cartItems,
    isLoading,
    error,
  } = useQuery<CartItem[]>(
    ["cart", accessToken],
    async () => {
      if (!accessToken) throw new Error("No access token");

      // Get cart items
      const cartResponse = await getFromCart(accessToken);

      // Fetch product details for each cart item
      const itemsWithProducts = await Promise.all(
        cartResponse.map(async (item) => {
          try {
            const productResponse = await axios.get(
              `${BASE_URL}/api/products/${item.productId}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            return {
              ...item,
              product: productResponse.data,
            };
          } catch (error) {
            console.error(`Failed to fetch product ${item.productId}:`, error);
            return item;
          }
        })
      );

      console.log("Cart items with products:", itemsWithProducts);
      return itemsWithProducts;
    },
    {
      enabled: !!accessToken,
      staleTime: 1000 * 60 * 5,
      onError: (error) => {
        handleAuthError(error, navigate, dispatch);
      },
    }
  );

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    console.error("Cart error:", error);
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] px-6">
        <p className="text-red-500 mb-4">Failed to load cart items</p>
        <button
          onClick={() => navigate("/Home")}
          className="bg-black text-white px-6 py-2 rounded-full"
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] px-6">
        <img
          src="/src/assets/icons/empty-cart.svg"
          alt="Empty Cart"
          className="w-32 h-32 mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-4">Add some products to your cart</p>
        <button
          onClick={() => navigate("/Home")}
          className="bg-black text-white px-6 py-2 rounded-full"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  // Calculate total with fetched product data
  const cartTotal = cartItems.reduce((total, item) => {
    if (!item.product) return total;
    return total + item.product.price * item.count;
  }, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="grid gap-4 mb-[100px]">
          {cartItems.map((item, index) => {
            if (!item.product) return null;
            return (
              <CartCard
                key={`${item.productId}-${item.size}-${item.color}-${index}`}
                product={item.product}
                quantity={item.count}
                size={item.size}
                color={item.color}
              />
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg border-t border-gray-200">
        <div className="px-6 py-4 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Price</p>
              <p className="text-2xl font-bold">${cartTotal.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">{cartItems.length} items</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/Checkout")}
            className="w-full bg-black text-white h-12 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
