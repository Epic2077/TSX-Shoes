import React, { useState } from "react";
import ShippingCard from "../../components/checkout.components/Shipping.cards";

const ShippingDelivery: React.FC = () => {
  // State to track the currently active card
  const [activeCard, setActiveCard] = useState<string>("Regular"); // Default active card

  // Function to handle card click
  const handleCardClick = (title: string) => {
    setActiveCard(title); // Set the clicked card as active
  };

  return (
    <div className="px-6 py-2">
      <div className="grid gap-3">
        <ShippingCard
          title="Economy"
          address="Estimated Arrival, ..."
          icon="economy"
          cost={10}
          active={activeCard === "Economy"} // Check if this card is active
          onClick={() => handleCardClick("Economy")} // Update active card
        />
        <ShippingCard
          title="Regular"
          address="Estimated Arrival, ..."
          icon="regular"
          cost={15}
          active={activeCard === "Regular"} // Check if this card is active
          onClick={() => handleCardClick("Regular")} // Update active card
        />
        <ShippingCard
          title="Cargo"
          address="Estimated Arrival, ..."
          icon="cargo"
          cost={20}
          active={activeCard === "Cargo"} // Check if this card is active
          onClick={() => handleCardClick("Cargo")} // Update active card
        />
        <ShippingCard
          title="Express"
          address="Estimated Arrival, ..."
          icon="express"
          cost={30}
          active={activeCard === "Express"} // Check if this card is active
          onClick={() => handleCardClick("Express")} // Update active card
        />
      </div>
    </div>
  );
};

export default ShippingDelivery;
