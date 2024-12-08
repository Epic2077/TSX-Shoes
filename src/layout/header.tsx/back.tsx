import React from "react";
import { useNavigate } from "react-router-dom";

interface backProps {
  address: string;
}

const Back: React.FC<backProps> = ({ address }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(address);
  };

  return (
    <div
      className="w-8 h-8 grid justify-center items-center"
      onClick={handleNavigation}
    >
      <img src="../../../src/assets/icons/back.svg" alt="back" />
    </div>
  );
};
export default Back;
