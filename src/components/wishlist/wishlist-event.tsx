import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../api/Base";

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
  const accessToken = useSelector((state: RootState) => state.auth.token);

  const addToWishlist = async () => {
    if (!accessToken) {
      console.error("No access token found. User may not be logged in.");
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
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Access token may be invalid or expired.");
      } else {
        console.error("Error adding product to wishlist:", error);
      }
    }
  };

  return (
    <>
      <div className="w-7 h-7 cursor-pointer" onClick={addToWishlist}>
        <img
          src="../../../src/assets/icons/heart.svg"
          alt="add-to-wishlist"
          className="w-full h-full"
        />
      </div>
    </>
  );
};

export default WishlistEvent;
