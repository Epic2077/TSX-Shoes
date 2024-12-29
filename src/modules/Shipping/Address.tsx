import React, { useState } from "react";
import ShippingCard from "../../components/checkout.components/Shipping.cards";

const ShippingAddress: React.FC = () => {
  // State to track the currently active card
  const [activeCard, setActiveCard] = useState<string>("Home"); // Default active card

  // Function to handle card click
  const handleCardClick = (title: string) => {
    setActiveCard(title); // Set the clicked card as active
  };

  return (
    <div className="px-6 py-2">
      <div className="grid gap-3">
        <ShippingCard
          title="Home"
          address="Some Home Address"
          icon="location"
          active={activeCard === "Home"} // Check if this card is active
          onClick={() => handleCardClick("Home")} // Update active card
        />
        <ShippingCard
          title="Office"
          address="Some Random Address"
          icon="location"
          active={activeCard === "Office"} // Check if this card is active
          onClick={() => handleCardClick("Office")} // Update active card
        />
        <ShippingCard
          title="Apartment"
          address="Some Random Address"
          icon="location"
          active={activeCard === "Apartment"} // Check if this card is active
          onClick={() => handleCardClick("Apartment")} // Update active card
        />
        <ShippingCard
          title="Parent's House"
          address="Some Random Address"
          icon="location"
          active={activeCard === "Parent's House"} // Check if this card is active
          onClick={() => handleCardClick("Parent's House")} // Update active card
        />
      </div>
      <div className="w-full h-12 bg-gray-300 grid justify-center items-center rounded-full mt-4">
        Add New Address
      </div>
    </div>
  );
};

export default ShippingAddress;
