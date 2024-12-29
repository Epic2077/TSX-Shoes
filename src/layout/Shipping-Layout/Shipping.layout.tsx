import React from "react";
import Back from "../../components/Auth-components/header.tsx/back";
import { Outlet } from "react-router-dom";

const ShippingLayout: React.FC = () => {
  const url = location.pathname.toLowerCase();

  const addressTitle: boolean = url.includes("address");

  const title = addressTitle ? "Shipping_Address" : "Choose_Shipping";

  return (
    <div>
      <header className="px-8 py-5">
        <Back address="/Checkout" name={title} />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default ShippingLayout;
