import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShippingCard from "../../components/checkout.components/Shipping.cards";
import { toast } from "react-toastify";

interface DeliveryOption {
  title: string;
  address: string;
  icon: string;
  cost: number;
}

const deliveryOptions: DeliveryOption[] = [
  {
    title: "Economy",
    address: "Estimated Arrival, Dec 20-23",
    icon: "economy",
    cost: 10,
  },
  {
    title: "Regular",
    address: "Estimated Arrival, Dec 18-20",
    icon: "regular",
    cost: 15,
  },
  {
    title: "Cargo",
    address: "Estimated Arrival, Dec 16-18",
    icon: "cargo",
    cost: 20,
  },
  {
    title: "Express",
    address: "Estimated Arrival, Dec 15-16",
    icon: "express",
    cost: 30,
  },
];

const ShippingDelivery: React.FC = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState<string>(
    localStorage.getItem("selectedDelivery") || "Regular"
  );

  const handleCardClick = (title: string) => {
    setActiveCard(title);
  };

  const handleApply = () => {
    if (!activeCard) {
      toast.error("Please select a delivery method");
      return;
    }

    const selectedOption = deliveryOptions.find(
      (opt) => opt.title === activeCard
    );
    localStorage.setItem("selectedDelivery", activeCard);
    localStorage.setItem("deliveryDetails", JSON.stringify(selectedOption));
    toast.success("Delivery method selected successfully!");
    navigate(-1);
  };

  return (
    <div className="px-6 py-2">
      <div className="grid gap-3">
        {deliveryOptions.map((option) => (
          <ShippingCard
            key={option.title}
            title={option.title}
            address={option.address}
            icon={option.icon}
            cost={option.cost}
            active={activeCard === option.title}
            onClick={() => handleCardClick(option.title)}
          />
        ))}
      </div>

      <button
        onClick={handleApply}
        className="bg-black text-white px-4 py-4 rounded-full w-full mt-4 sticky bottom-4"
      >
        Apply
      </button>
    </div>
  );
};

export default ShippingDelivery;
