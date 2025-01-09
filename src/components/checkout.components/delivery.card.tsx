import React from "react";
import { useNavigate } from "react-router-dom";

const DeliveryCard: React.FC = () => {
  const navigate = useNavigate();
  const deliveryDetails = JSON.parse(
    localStorage.getItem("deliveryDetails") || "null"
  );

  return (
    <div className="w-full bg-slate-50 rounded-3xl p-5 flex gap-4 items-center">
      <div className="w-16 h-16 bg-black rounded-full grid justify-center items-center">
        <img
          src={`../../../src/assets/icons/${
            deliveryDetails?.icon || "cargo"
          }.svg`}
          alt="delivery"
          className="w-9"
        />
      </div>
      <div className="flex-1">
        <h1 className="text-xl font-semibold">
          {deliveryDetails
            ? `${deliveryDetails.title} - $${deliveryDetails.cost}`
            : "Choose Shipping Type"}
        </h1>
        {deliveryDetails && (
          <p className="text-gray-500 truncate">{deliveryDetails.address}</p>
        )}
      </div>
      <img
        src="../../../src/assets/icons/right.svg"
        alt="right"
        className="w-8 ml-auto cursor-pointer"
        onClick={() => navigate("/Checkout/Delivery")}
      />
    </div>
  );
};

export default DeliveryCard;
