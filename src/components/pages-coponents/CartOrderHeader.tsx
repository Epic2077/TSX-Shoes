import React from "react";
import { useNavigate } from "react-router-dom";

interface headerProps {
  name: string;
}

const CartOrderHeader: React.FC<headerProps> = ({ name }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center px-6 py-3">
      <div className="flex items-center gap-4">
        <img
          src="../../../src/assets/icons/black-logo.svg"
          alt="logo"
          className="w-7 h-7"
          onClick={() => navigate("/Home")}
        />
        <p className="font-semibold text-3xl">{name}</p>
      </div>
      <img
        src="../../../src/assets/icons/search.svg"
        alt="search"
        className="w-7 h-7"
      />
    </div>
  );
};
export default CartOrderHeader;
