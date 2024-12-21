import Api from "../../api/Base";
import { findUserById } from "../../api/users";
import { Product } from "../../types/Product.type";
import { User } from "../../types/Users.type";

const deleteProductFromCart = async (product: Product) => {
  const LoggedUser =
    localStorage.getItem("user") || sessionStorage.getItem("user");

  if (!LoggedUser) {
    console.error("No logged-in user found.");
    return;
  }

  const parsedUser = JSON.parse(LoggedUser);
  const userId = parsedUser.id;

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
};

export default deleteProductFromCart;
