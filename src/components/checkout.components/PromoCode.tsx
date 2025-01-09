import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from "axios";
import { BASE_URL } from "../../api/Base";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "react-query";

interface Discount {
  discount: number;
}

interface CartItem {
  count: number;
  price: number;
}

const PromoCode: React.FC = () => {
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null);
  const accessToken = useSelector((state: RootState) => state.auth.token);
  const deliveryDetails = JSON.parse(
    localStorage.getItem("deliveryDetails") || "null"
  );

  // Fetch cart items to calculate total
  const { data: cartItems } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await axios.get<CartItem[]>(`${BASE_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    },
  });

  // Calculate cart total
  const cartTotal =
    cartItems?.reduce((total, item) => total + item.price * item.count, 0) || 0;
  const shippingCost = deliveryDetails?.cost || 0;

  const handleApplyPromo = async () => {
    if (!promoCode) {
      toast.error("Please enter a promo code", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    try {
      const response = await axios.get<Discount>(
        `${BASE_URL}/api/discount/${promoCode}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      setAppliedDiscount(response.data);
      setPromoCode(promoCode.toUpperCase());
      toast.success("Promo code applied successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Invalid promo code", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setAppliedDiscount(null);
      setPromoCode("");
    }
  };

  // Calculate totals
  const discount = appliedDiscount ? appliedDiscount.discount : 0;
  const total = cartTotal + shippingCost - discount;

  return (
    <div className="w-full">
      <ToastContainer />
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter Promo Code"
          className="flex-1 p-3 rounded-lg border border-gray-300 outline-none"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <button
          onClick={() => handleApplyPromo()}
          className="bg-black rounded-full w-14 h-14 grid place-items-center cursor-pointer"
        >
          <img
            src="../../../src/assets/icons/plus.svg"
            alt="add"
            className="w-6 h-6"
          />
        </button>
      </div>

      <div className="space-y-4 gap-4 bg-slate-50 rounded-3xl p-5">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Amount</span>
          <span className="font-semibold">${cartTotal.toFixed(2)}</span>
        </div>
        {appliedDiscount && (
          <div className="flex justify-between items-center text-green-600">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold">${shippingCost.toFixed(2)}</span>
        </div>
        <hr className="border-gray-300" />
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full bg-black text-white rounded-full py-4 mt-6">
        Continue to Payment
      </button>
    </div>
  );
};

export default PromoCode;
