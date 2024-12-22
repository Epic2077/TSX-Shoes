import React from "react";
import { useNavigate } from "react-router-dom";

interface addressProps {
  title: string;
  address: string;
}

const AddressCart: React.FC<addressProps> = ({ title, address }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 w-full h-28 mt-6 rounded-3xl p-5 flex gap-4 items-center">
      <div className="w-16 h-16 bg-slate-200 rounded-full grid justify-center items-center">
        <div className="h-11 w-11 bg-black rounded-full grid justify-center items-center">
          <img src="../../../src/assets/icons/location.svg" alt="location" />
        </div>
      </div>
      <div className="grid justify-between">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-base text-gray-500">{address}</p>
      </div>
      <img
        src="../../../src/assets/icons/pen.svg"
        alt="pen"
        className="w-7 h-7 ml-auto"
        onClick={() => navigate("/Checkout/Address")}
      />
    </div>
  );
};
export default AddressCart;
