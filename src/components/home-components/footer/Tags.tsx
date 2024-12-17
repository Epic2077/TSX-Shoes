import React from "react";

interface tagProps {
  name: string;
}

const Tag: React.FC<tagProps> = ({ name }) => {
  return (
    <div className="grid gap-[2px]">
      <img
        src={`../../../../src/assets/icons/${name}.svg`}
        alt={name}
        className={`w-6 h-6`}
      />
      <p className="font-semibold text-[10px] text-center">{name}</p>
    </div>
  );
};

export default Tag;
