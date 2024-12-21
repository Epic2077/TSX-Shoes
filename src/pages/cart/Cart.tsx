import React from "react";
import CartContainer from "../../components/cart-components/cart.container";

const CartPage: React.FC = () => {
  return (
    <>
      <div className="py-6 min-h-[800px]">
        <CartContainer />
        <div className="absolute bottom-0 mb-[66px] rounded-t-3xl h-[100px] w-full border-slate-400 border border-b-0 px-4 flex items-center gap-6">
          <div className="grid">
            <p className="text-[15px] text-slate-400">Total Price</p>
            <p className="font-semibold text-[30px]">$000.00</p>
          </div>
          <div className="w-full bg-black h-[65px] rounded-full text-white text-xl font-semibold grid justify-center items-center">
            Checkout
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
