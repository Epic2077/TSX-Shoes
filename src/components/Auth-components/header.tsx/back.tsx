import React from "react";
import { useNavigate } from "react-router-dom";

interface backProps {
  address: string;
  name?: string;
}

const Back: React.FC<backProps> = ({ address, name }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(address);
  };

  return (
    <div
      className="w-8 h-8 flex justify-center items-center"
      onClick={handleNavigation}
    >
      <img src="../../../src/assets/icons/back.svg" alt="back" />
      <p className="text-xl font-semibold">{name}</p>
    </div>
  );
};
export default Back;
