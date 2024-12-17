import React from "react";
import { useNavigate } from "react-router-dom";

interface backProps {
  name?: string;
}

const Back: React.FC<backProps> = ({ name }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(-1);
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
