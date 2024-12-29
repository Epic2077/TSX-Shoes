import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeliveryCard: React.FC = () => {
  const navigate = useNavigate();
  const [icon, seticon] = useState<string>("cargo");
  const [title, setTitle] = useState<string>("Choose Shipping Type");
  const [active, setActive] = useState<boolean>(false);

  const delivery = localStorage.getItem("delivery");

  if (delivery) {
    setActive(true);
  }

  return (
    <>
      {active === false && (
        <div className="w-full bg-slate-50 rounded-3xl p-5 flex gap-4 items-center">
          <img
            src={`../../../src/assets/icons/${icon}.svg`}
            alt={icon}
            className="w-9 invert"
          />
          <h1 className="text-xl font-semibold">{title}</h1>
          <img
            src="../../../src/assets/icons/right.svg"
            alt="right"
            className="w-8 ml-auto"
            onClick={() => navigate("/Checkout/Delivery")}
          />
        </div>
      )}
    </>
  );
};

export default DeliveryCard;
