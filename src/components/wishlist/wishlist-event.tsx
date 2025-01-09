import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../api/Base";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface RootState {
  auth: {
    token: string;
  };
}
interface ProductPageProps {
  product: {
    id: string;
  };
}

const WishlistEvent = ({ product }: ProductPageProps) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const accessToken = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  // Check if product is in wishlist on component mount
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!accessToken) return;

      try {
        const response = await axios.get(
          `${BASE_URL}/api/wishlist?search=${product.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        // Assuming the API returns an array of wishlist items
        setIsInWishlist(response.data.length > 0);
      } catch (error) {
        console.error("Error checking wishlist status:", error);
      }
    };

    checkWishlistStatus();
  }, [product.id, accessToken]);

  const addToWishlist = async () => {
    if (!accessToken) {
      const wantsToLogin = window.confirm(
        "You need to be logged in to add items to your wishlist. Would you like to log in?"
      );

      if (wantsToLogin) {
        navigate("/auth/login");
      }
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/Api/Wishlist`,
        { productId: product.id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Product added to wishlist:", response.data);
    } catch (error: unknown) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        console.error("Unauthorized: Access token may be invalid or expired.");
      } else {
        console.error("Error adding product to wishlist:", error);
      }
    }
  };

  return (
    <div className="w-7 h-7 cursor-pointer" onClick={addToWishlist}>
      <img
        src={
          isInWishlist
            ? "../../../src/assets/icons/heart-filled.svg"
            : "../../../src/assets/icons/heart.svg"
        }
        alt="add-to-wishlist"
        className="w-full h-full"
      />
    </div>
  );
};

export default WishlistEvent;
