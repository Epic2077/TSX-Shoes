import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from "axios";
import { BASE_URL } from "../../api/Base";
import { useNavigate } from "react-router-dom";
import OrderActiveCards from "./OrderCards";

interface Order {
  userId: number;
  status: string;
  name: string;
  productId: number;
  count: number;
  color: string;
  size: number;
  images: string[];
  price: number;
  total_price: number;
  shippingType: string;
  address: string;
}

const Order = () => {
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.token);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", activeTab],
    queryFn: async () => {
      try {
        // Get orders based on active tab
        const status = activeTab === "active" ? "indelivery" : "completed";
        const response = await axios.get<Order[]>(
          `${BASE_URL}/api/orders?status=${status}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        console.log("Orders response:", response.data);
        return response.data || [];
      } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
      }
    },
  });

  if (isLoading)
    return <div className="flex justify-center mt-8">Loading...</div>;

  const safeOrders = Array.isArray(orders) ? orders : [];

  console.log("Safe Orders:", safeOrders);

  safeOrders.forEach((order, index) => {
    console.log(`Order ${index}:`, {
      name: order.name,
      status: order.status,
      images: order.images,
      price: order.price,
      size: order.size,
      color: order.color,
      count: order.count,
    });
  });

  const NoOrders = () => (
    <div className="flex flex-col items-center justify-center mt-20">
      <img
        src="../../../src/assets/footer-icons/Orders.svg"
        alt="No Orders"
        className="w-32 h-32 mb-4"
      />
      <p className="text-gray-500 text-lg mb-4">No orders submitted</p>
      <button
        onClick={() => navigate("/Home")}
        className="bg-black text-white px-6 py-3 rounded-full"
      >
        Go Shopping
      </button>
    </div>
  );

  return (
    <div className="mx-6 min-h-screen">
      <div className="flex mt-4 w-full">
        <div
          onClick={() => setActiveTab("active")}
          className={`text-xl font-semibold p-6 items-center justify-center w-full cursor-pointer
            ${
              activeTab === "active"
                ? "text-black border-b-4 border-black"
                : "text-gray-400 border-b-4 border-gray-300"
            }`}
        >
          <p className="text-center">Active</p>
        </div>
        <div
          onClick={() => setActiveTab("completed")}
          className={`text-xl font-semibold p-6 items-center justify-center w-full cursor-pointer
            ${
              activeTab === "completed"
                ? "text-black border-b-4 border-black"
                : "text-gray-400 border-b-4 border-gray-300"
            }`}
        >
          <p className="text-center">Completed</p>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "active" ? (
          safeOrders.length > 0 ? (
            <div className="space-y-6">
              {safeOrders.map((order) => {
                console.log("Rendering order:", order);
                return (
                  <div
                    key={order.productId}
                    className="bg-slate-50 p-4 rounded-2xl"
                  >
                    <OrderActiveCards
                      image={order.images[0]}
                      name={order.name}
                      size={order.size}
                      color={order.color}
                      price={order.price}
                      quantity={order.count}
                      status={order.status}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <NoOrders />
          )
        ) : (
          <div className="flex flex-col items-center justify-center mt-20">
            <p className="text-gray-500 text-lg">No completed orders</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
