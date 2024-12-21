import React, { useEffect, useState } from "react";
import { User } from "../../types/Users.type";
import { findUserById } from "../../api/users";
import { useNavigate } from "react-router-dom";
import CartCard from "./cart.card";

const CartContainer: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored user and set userId
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (!storedUser) {
      navigate("Auth/Login");
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id);
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch user details if userId is set
    const fetchUser = async () => {
      if (userId) {
        try {
          const foundUser = await findUserById(userId);
          setUser(foundUser);
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUser();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center my-30">
        <img
          src="../../../../../src/assets/icons/spinner-atom.svg"
          alt="loading"
          className="animate-spin"
        />
      </div>
    );
  }

  const userCart = user?.carts ?? []; // Default to an empty array if no carts

  return (
    <div>
      <div className="px-6 grid gap-6">
        {userCart.length > 0 ? (
          userCart.map((product) => (
            <CartCard key={product.id} product={product} />
          ))
        ) : (
          <div>Your cart is empty.</div>
        )}
      </div>
      <div className="absolute bottom-0 mb-[66px] rounded-t-3xl h-[100px] w-full border-slate-400 border border-b-0 px-4 flex items-center gap-6 z-0">
        <div className="grid">
          <p className="text-[15px] text-slate-400">Total Price</p>
          <p className="font-semibold text-[30px]">$000.00</p>
        </div>
        <div className="w-full bg-black h-[65px] rounded-full text-white text-xl font-semibold grid justify-center items-center ">
          Checkout
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
