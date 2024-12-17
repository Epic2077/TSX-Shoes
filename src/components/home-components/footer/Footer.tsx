import React from "react";
import Tag from "./Tags";

const HomeFooter: React.FC = () => {
  return (
    <div className="px-6 flex items-center justify-between bg-white h-[66px] sticky bottom-0">
      <Tag name="Home" active={true} />
      <Tag name="Cart" active={true} />
      <Tag name="Orders" active={true} />
      <Tag name="Wallet" active={true} />
      <Tag name="Profile" active={true} />
    </div>
  );
};

export default HomeFooter;
