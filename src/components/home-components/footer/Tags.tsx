import React from "react";
import { useNavigate } from "react-router-dom";

interface tagProps {
  name: string;
  active: boolean;
}

const Tag: React.FC<tagProps> = ({ name, active }) => {
  const navigate = useNavigate();
  return (
    <div className="grid gap-[2px]" onClick={() => navigate(`/${name}`)}>
      <img
        src={`../../../../src/assets/footer-icons/${
          active ? name : name + "-de"
        }.svg`}
        alt={name}
        className={`mx-auto  w-6 h-6`}
      />
      <p className="font-semibold text-xs text-center">{name}</p>
    </div>
  );
};

export default Tag;
