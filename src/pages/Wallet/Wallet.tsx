import React, { useState } from "react";
import Back from "../../components/Auth-components/header/back";
import PaymentCards from "./PaymentCards";

const Wallet = () => {
  const [activeCard, setActiveCard] = useState<string>("My Wallet");

  const handleCardClick = (card: string) => {
    setActiveCard(card);
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
        <button className="w-full bg-black text-white rounded-full p-4 mt-36">
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default Wallet;
