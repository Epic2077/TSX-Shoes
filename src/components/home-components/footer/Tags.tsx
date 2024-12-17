import React from "react";

interface tagProps {
  name: string;
  active: boolean;
}

const Tag: React.FC<tagProps> = ({ name, active }) => {
  return (
    <div className="grid gap-[2px]">
      <img
        src={`../../../../src/assets/icons/${name}.svg`}
        alt={name}
        className={`mx-auto ${active ? "brightness-0" : "brightness-0 invert"}`}
      />
      <p className="font-semibold text-xs text-center">{name}</p>
    </div>
  );
};

export default Tag;
