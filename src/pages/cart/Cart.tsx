import React from "react";
import CartContainer from "../../components/cart-components/cart.container";

const CartPage: React.FC = () => {
  return (
    <>
      <div className="py-6 min-h-[800px]">
        <CartContainer />
      </div>
    </>
  );
};

export default CartPage;
