import React from "react";
import Back from "../Auth-components/header/back";

const CheckoutHeader: React.FC = () => {
  return (
    <div className="flex items-center">
      <Back address="/Cart" />
      <h2 className="font-semibold text-3xl">Checkout</h2>
    </div>
  );
};
export default CheckoutHeader;
