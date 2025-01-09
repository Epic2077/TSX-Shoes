import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../api/Base";
import { RootState } from "../../store";
import { useQuery } from "react-query";
import { CartItem } from "../../types/CartItem.type";
import OrderCards from "./OrderCards";

const OrderList = () => {
  const accessToken = useSelector((state: RootState) => state.auth.token);

  const { data: cartItems, isLoading } = useQuery({
    queryKey: ["cart", accessToken],
    queryFn: async () => {
      const response = await axios.get<CartItem[]>(`${BASE_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Raw Cart Response:", response.data);
      return response.data;
    },
  });

  console.log("Cart Items in component:", cartItems);

  if (isLoading) return <div>Loading...</div>;
  if (!cartItems || cartItems.length === 0) return <div>No items in cart</div>;

  return (
    <div className="mt-4 grid gap-4">
      <div className="">Total items: {cartItems.length}</div>
      {cartItems.map((item) => {
        const product = {
          id: item.productId,
          name: item.name,
          price: item.price,
          images: item.images,
        };

        return (
          <OrderCards
            key={`${item.productId}-${item.size}-${item.color}`}
            product={product}
            quantity={item.count}
            size={item.size}
            color={item.color}
          />
        );
      })}
    </div>
  );
};

export default OrderList;
