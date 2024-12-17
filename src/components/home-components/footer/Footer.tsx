import React from "react";
import Tag from "./Tags";

const HomeFooter: React.FC = () => {
  return (
    <div className="px-6 flex items-center justify-between bg-white h-[66px] sticky bottom-0">
      <Tag name="Home" />
      <Tag name="Cart" />
      <Tag name="Orders" />
      <Tag name="Wallet" />
      <Tag name="Profile" />
    </div>
  );
};

export default HomeFooter;
