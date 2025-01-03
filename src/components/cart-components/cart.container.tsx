import React, { useEffect, useState } from "react";
import { User } from "../../types/Users.type";
import { findUserById } from "../../api/users";
import { useNavigate } from "react-router-dom";
import CartCard from "./cart.card";
import { LoadingSpinner } from "../loading-spinner/loading";

const CartContainer: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [cartPrice, setCartPrice] = useState<number>(0);

  const navigate = useNavigate();

  if (isLoading) {
    <LoadingSpinner />;
  }

  return (
    <div>
      <div className="px-6 grid gap-6">
        <div>Your cart is empty.</div>
      </div>
      <div className="absolute bottom-0 mb-[66px] rounded-t-3xl h-[100px] w-full border-slate-400 border border-b-0 px-4 flex items-center gap-6 z-0">
        <div className="grid">
          <p className="text-[15px] text-slate-400">Total Price</p>
          <p className="font-semibold text-[30px]">${cartPrice.toFixed(2)}</p>
        </div>
        <div
          className="w-full bg-black h-[65px] rounded-full text-white text-xl font-semibold grid justify-center items-center "
          onClick={() => navigate("/Checkout")}
        >
          Checkout
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
