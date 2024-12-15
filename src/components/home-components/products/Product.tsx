import React, { useState } from "react";
import { BrandArray } from "../brandPage/brandArray";
import FilterBtn from "../filter-button/btn";

const HomeProducts: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };
  return (
    <>
      <div className="flex gap-[12px] overflow-x-auto max-w-full mt-3 overflow-y-hidden py-2">
        <FilterBtn
          text="All"
          isActive={activeFilter === "All"}
          onClick={() => handleFilterClick("All")}
        />
        {BrandArray.map((brand) => (
          <FilterBtn
            key={brand.name}
            text={brand.name}
            isActive={activeFilter === brand.name}
            onClick={() => handleFilterClick(brand.name)}
          />
        ))}
      </div>
    </>
  );
};

export default HomeProducts;
