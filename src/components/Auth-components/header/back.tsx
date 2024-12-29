import React from "react";
import { useNavigate } from "react-router-dom";

interface backProps {
  address?: string;
  name?: string;
}

const Back: React.FC<backProps> = ({ address, name }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (!address) {
      navigate(-1);
    } else {
      navigate(address);
    }
  };

  return (
    <div
      className="w-8 h-8 flex justify-center items-center cursor-pointer"
      onClick={handleNavigation}
    >
      <img src="../../../src/assets/icons/back.svg" alt="back" />
      <p className="text-xl font-semibold ml-3 w-full">{name}</p>
    </div>
  );
};
export default Back;
