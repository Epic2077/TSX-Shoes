import React from "react";

interface addressProps {
  title: string;
  address: string;
  def?: boolean;
  icon: string;
  active: boolean;
  onClick: () => void;
}

const ShippingCard: React.FC<addressProps> = ({
  title,
  address,
  def,
  icon,
  active,
  onClick,
}) => {
  return (
    <div
      className="bg-slate-50 w-full h-28 mt-6 rounded-3xl px-5 flex gap-4 items-center"
      onClick={onClick}
    >
      <div className="w-16 h-16 bg-slate-200 rounded-full grid justify-center items-center">
        <div className="h-11 w-11 bg-black rounded-full grid justify-center items-center">
          <img src={`../../../src/assets/icons/${icon}.svg`} alt={icon} />
        </div>
      </div>
      <div className="grid justify-between gap-2">
        <p className="text-lg font-semibold">
          {title}{" "}
          <span
            className={`${
              def ? "ml-1" : "hidden"
            } text-xs p-[6px] rounded bg-gray-200`}
          >
            Default
          </span>
        </p>
        <p className="text-base text-gray-500">{address}</p>
      </div>
      <div className="w-6 h-6 border-[3px] border-black grid justify-center items-center rounded-full ml-auto">
        {active && <div className="w-3 h-3 bg-black rounded-full"></div>}
      </div>
    </div>
  );
};
export default ShippingCard;
