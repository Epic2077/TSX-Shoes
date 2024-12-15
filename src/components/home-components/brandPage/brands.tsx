import React from "react";
import { BrandArray } from "./brandArray";

const HomeBrand: React.FC = () => {
  return (
    <div className="w-full justify-between gap-y-7 grid grid-cols-4 mt-[22px]">
      {BrandArray.map((brand) => (
        <div className="grid gap-[13px] justify-center">
          <div className="w-[60px] h-[60px] flex justify-center items-center bg-[#ECECEC] rounded-full">
            <img src={brand.images} alt={brand.fullName} />
          </div>
          <p className="font-semibold text-sm text-center">{brand.name}</p>
        </div>
      ))}
    </div>
  );
};
export default HomeBrand;
