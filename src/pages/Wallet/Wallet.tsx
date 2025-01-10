import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../api/Base";
import { RootState } from "../../store";
import Back from "../../components/Auth-components/header/back";
import PaymentCards from "./PaymentCards";

interface OrderPopupProps {
  onClose: () => void;
  onViewOrders: () => void;
}

const OrderSuccessPopup: React.FC<OrderPopupProps> = ({
  onClose,
  onViewOrders,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-2xl max-w-sm w-full mx-4">
      <h3 className="text-2xl font-semibold text-center mb-4">
        Purchase Successful!
      </h3>
      <p className="text-gray-600 text-center mb-6">
        Your order has been placed successfully.
      </p>
      <div className="space-y-3">
        <button
          onClick={onViewOrders}
          className="w-full bg-black text-white rounded-full py-3"
        >
          View Orders
        </button>
        <button
          onClick={onClose}
          className="w-full bg-gray-200 rounded-full py-3"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  </div>
);

const Wallet = () => {
  const [activeCard, setActiveCard] = useState<string>("My Wallet");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accessToken = useSelector((state: RootState) => state.auth.token);

  const { data: cartItems } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    },
  });

  const handleCardClick = (card: string) => {
    setActiveCard(card);
  };

  const handleConfirmPayment = async () => {
    const selectedAddress = localStorage.getItem("selectedAddress");
    const deliveryDetails = JSON.parse(
      localStorage.getItem("deliveryDetails") || "null"
    );
    const appliedDiscount = JSON.parse(
      localStorage.getItem("appliedDiscount") || "null"
    );

    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    if (!deliveryDetails) {
      toast.error("Please select a shipping method");
      return;
    }

    try {
      const orderData = {
        products: cartItems,
        discount: appliedDiscount?.discount || 0,
        shippingType: deliveryDetails.title,
        address: selectedAddress,
      };

      await axios.post(`${BASE_URL}/api/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      // Clear cart and related data
      queryClient.invalidateQueries(["cart"]);
      localStorage.removeItem("appliedDiscount");
      localStorage.removeItem("deliveryDetails");

      // Show success popup
      setShowSuccessPopup(true);
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error("Order error:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="mx-8 my-4">
        <div className="flex items-center">
          <Back />
          <h2 className="font-semibold text-3xl">Payment Methods</h2>
        </div>
      </header>
      <div className="mx-6">
        <h3 className="text-lg font-semibold text-gray-600">
          Select the payment method you want to use.
        </h3>
        <div className="grid gap-8 w-full mt-6">
          <PaymentCards
            icon={"../../../src/assets/footer-icons/Wallet.svg"}
            name={"My Wallet"}
            onClick={() => handleCardClick("My Wallet")}
            active={activeCard === "My Wallet"}
          />
          <PaymentCards
            icon={"../../../src/assets/icons/paypal.svg"}
            name={"Paypal"}
            onClick={() => handleCardClick("Paypal")}
            active={activeCard === "Paypal"}
          />
          <PaymentCards
            icon={"../../../src/assets/icons/google-pay.svg"}
            name={"Google Pay"}
            onClick={() => handleCardClick("Google Pay")}
            active={activeCard === "Google Pay"}
          />
          <PaymentCards
            icon={"../../../src/assets/icons/apple-pay.svg"}
            name={"Apple Pay"}
            onClick={() => handleCardClick("Apple Pay")}
            active={activeCard === "Apple Pay"}
          />
          <PaymentCards
            icon={"../../../src/assets/icons/master-card.svg"}
            name={"**** **** **** 4679"}
            onClick={() => handleCardClick("Bank Card")}
            active={activeCard === "Bank Card"}
          />
        </div>
        <button
          onClick={handleConfirmPayment}
          className="w-full bg-black text-white rounded-full p-4 mt-36"
        >
          Confirm Payment
        </button>
      </div>

      {showSuccessPopup && (
        <OrderSuccessPopup
          onClose={() => {
            setShowSuccessPopup(false);
            navigate("/Home");
          }}
          onViewOrders={() => {
            setShowSuccessPopup(false);
            navigate("/orders");
          }}
        />
      )}
    </div>
  );
};

export default Wallet;
