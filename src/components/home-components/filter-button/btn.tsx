import React from "react";

interface filterProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterBtn: React.FC<filterProps> = ({ text, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`px-5 min-h-[39px] border-black border-2 rounded-3xl grid items-center cursor-pointer w-auto transition-colors duration-200 ${
        isActive ? "bg-black text-white" : "bg-transparent text-black"
      }`}
    >
      {text.split(" ")}
    </div>
  );
};
export default FilterBtn;
