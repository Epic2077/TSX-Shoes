import React from "react";

interface PaymentCardsProps {
  icon: string;
  name: string;
  onClick: () => void;
  active: boolean;
}

const PaymentCards = ({ icon, name, onClick, active }: PaymentCardsProps) => {
  return (
    <div
      className="w-full h-20 bg-gray-100 rounded-lg flex items-center gap-6 p-4"
      onClick={onClick}
    >
      <img src={icon} alt={name} className="w-9 h-9" />
      <h3 className="text-lg font-semibold">{name}</h3>
      <div className="w-6 h-6 border-[3px] border-black grid justify-center items-center rounded-full ml-auto">
        {active && <div className="w-3 h-3 bg-black rounded-full"></div>}
      </div>
    </div>
  );
};

export default PaymentCards;
