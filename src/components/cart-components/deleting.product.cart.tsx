import React from "react";
import Api from "../../api/Base";
import { findUserById } from "../../api/users";
import { Product } from "../../types/Product.type";
import { User } from "../../types/Users.type";

interface deleteProp {
  product: Product;
  deletingCart: boolean;
}

const deleteProductFromCart: React.FC<deleteProp> = ({
  product,
  deletingCart,
}) => {
  const LoggedUser =
    localStorage.getItem("user") || sessionStorage.getItem("user");

  if (!LoggedUser) {
    console.error("No logged-in user found.");
    return;
  }

  const parsedUser = JSON.parse(LoggedUser);
  const userId = parsedUser.id;
  const deleteFunc = async () => {
    if (deletingCart === true) {
      try {
        const foundUser: User = await findUserById(userId);

        if (!foundUser) {
          console.log("User was not Found");
        }

        const userCart = foundUser.carts;
        console.log("userCart:", userCart);
        if (!userCart) {
          console.error("No cart found!");
          return;
        }
        const updatedCart = userCart.filter(
          (cartProduct) => cartProduct.id !== product.id
        );
        console.log("updated Cart:", updatedCart);

        const response = await Api.patch(`users/${userId}`, {
          carts: updatedCart,
        });

        console.log("Cart successfully updated:", response.data);

        window.location.reload();
      } catch (error) {
        console.error("Error deleting product from cart:", error);
      }
    } else {
      console.log("Nothing changed");
      return;
    }
  };
  deleteFunc();

  return (
    <>
      <div className="w-screen h-screen bg-slate-700 opacity-50 absolute top-0 left-0 z-10"></div>
    </>
  );
};

export default deleteProductFromCart;
