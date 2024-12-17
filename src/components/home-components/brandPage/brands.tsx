import React from "react";
import { BrandArray } from "./brandArray";
import { useNavigate } from "react-router-dom";

const HomeBrand: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full justify-between gap-y-7 grid grid-cols-4 mt-[22px]">
        {BrandArray.map((brand) => (
          <div
            className="grid gap-[13px] justify-center cursor-pointer"
            onClick={() => navigate(`/Products/${brand.fullName.split(" ")}`)}
          >
            <div className="w-[60px] h-[60px] flex justify-center items-center bg-[#ECECEC] rounded-full">
              <img src={brand.images} alt={brand.fullName} />
            </div>
            <p className="font-semibold text-sm text-center">{brand.name}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4 items-center">
        <p className="font-semibold text-xl"> Most Popular</p>
        <p className="text-base font-semibold">See All</p>
      </div>
    </>
  );
};
export default HomeBrand;
