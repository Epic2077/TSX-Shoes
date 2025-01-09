import React, { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "react-query";
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
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const queryClient = useQueryClient();

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

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    console.log(`Updating quantity for product ${productId} to ${newQuantity}`);

    queryClient.setQueryData<CartItem[]>(["cart", accessToken], (prevItems) =>
      prevItems?.map((item) =>
        item.productId === productId.toString()
          ? { ...item, count: newQuantity }
          : item
      )
    );

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for server update
    timeoutRef.current = setTimeout(async () => {
      try {
        // Log the current cart data for debugging
        const currentCart = queryClient.getQueryData<CartItem[]>([
          "cart",
          accessToken,
        ]);
        console.log("Current cart data:", currentCart);

        const currentItem = currentCart?.find(
          (item) => item.productId === productId.toString()
        );

        if (!currentItem) {
          console.error(
            `Item with productId ${productId} not found in cart data`
          );
          throw new Error("Item not found in cart");
        }

        console.log("Found item:", currentItem); // Debug log

        await axios.put(
          `${BASE_URL}/api/cart/${productId}`,
          {
            count: newQuantity,
            color: currentItem.color,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Successfully updated quantity on server");
      } catch (error) {
        console.error("Failed to update quantity:", error);
        // Optionally handle error (e.g., revert quantity)
      }
    }, 3000);
  };

  const handleRemoveFromCart = async (productId: number) => {
    console.log(`Removing product ${productId} from cart`);

    try {
      const response = await axios.delete(`${BASE_URL}/api/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      // Log the response to see what we're getting
      console.log("Server response:", response);

      // Only invalidate if the request was successful
      if (response.status === 200 || response.status === 204) {
        console.log("Successfully removed item from cart");

        // Update local cache first
        queryClient.setQueryData<CartItem[]>(
          ["cart", accessToken],
          (prevItems) =>
            prevItems?.filter((item) => item.productId !== productId.toString())
        );

        // Then refetch from server
        await queryClient.invalidateQueries(["cart", accessToken]);
      }
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        console.error("Response status:", error.response?.status);
      }
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
          src="/src/assets/footer-icons/Cart.svg"
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
                onUpdateQuantity={(newQuantity) =>
                  handleUpdateQuantity(item.productId, newQuantity)
                }
                onRemove={() => handleRemoveFromCart(Number(item.productId))}
              />
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-[66px] left-0 right-0 bg-white rounded-t-3xl shadow-lg border-t border-gray-200">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[15px] text-slate-400">Total Price</p>
              <p className="font-semibold text-[30px]">
                ${cartTotal.toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => navigate("/Checkout")}
              className="bg-black flex text-white px-8 h-14 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors w-full ml-6 justify-center items-center gap-4 "
            >
              CheckOut{" "}
              <img
                src="../../../src/assets/icons/right-flash.svg"
                alt="right-arrow"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
