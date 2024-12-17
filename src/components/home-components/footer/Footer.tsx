import React from "react";
import Tag from "./Tags";
import { useLocation } from "react-router-dom";

const HomeFooter: React.FC = () => {
  const location = useLocation();

  const isActive = (name: string) => {
    return location.pathname.toLowerCase().includes(name.toLowerCase());
  };

  return (
    <div className="px-6 flex items-center justify-between bg-white h-[66px] sticky bottom-0">
      <Tag name="Home" active={isActive("Home")} />
      <Tag name="Cart" active={isActive("Cart")} />
      <Tag name="Orders" active={isActive("Orders")} />
      <Tag name="Wallet" active={isActive("Wallet")} />
      <Tag name="Profile" active={isActive("Profile")} />
    </div>
  );
};

export default HomeFooter;
