import React, { useState } from "react";
import { BrandArray } from "../brandPage/brandArray";
import FilterBtn from "../filter-button/btn";
import ProductsContainer from "./products-container/ProductsContainer.components";

const HomeProducts: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string[]>([]);

  const handleFilterClick = (filter: string) => {
    if (filter === "All") {
      setActiveFilter([]);
    } else {
      setActiveFilter((prevFilters) =>
        prevFilters.includes(filter)
          ? prevFilters.filter((f) => f !== filter)
          : [...prevFilters, filter]
      );
    }
  };
  return (
    <>
      <div className="flex gap-[12px] overflow-x-auto max-w-full mt-3 overflow-y-hidden py-2">
        <FilterBtn
          text="All"
          isActive={activeFilter.length === 0}
          onClick={() => handleFilterClick("All")}
        />
        {BrandArray.map((brand) => (
          <FilterBtn
            key={brand.name}
            text={brand.fullName}
            isActive={activeFilter.includes(brand.name.toLowerCase())}
            onClick={() => handleFilterClick(brand.name.toLowerCase())}
          />
        ))}
      </div>
      <ProductsContainer activeFilter={activeFilter} />
    </>
  );
};

export default HomeProducts;
