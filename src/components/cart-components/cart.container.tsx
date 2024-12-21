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
    <div className="px-6 grid gap-6">
      {userCart.length > 0 ? (
        userCart.map((product) => (
          <CartCard key={product.id} product={product} />
        ))
      ) : (
        <div>Your cart is empty.</div>
      )}
    </div>
  );
};

export default CartContainer;
