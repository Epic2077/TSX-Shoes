import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWishlist } from "../../store/slices/WishListSlice";
import axios from "axios";
import { BASE_URL } from "../../api/Base";
import { RootState } from "../../store";

const WishlistInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!accessToken) return;

      try {
        const response = await axios.get(`${BASE_URL}/api/wishlist`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const wishlistItems = response.data.map((item: any) => item.productId);
        dispatch(setWishlist(wishlistItems)); // Update Redux state
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [accessToken, dispatch]);

  return <>{children}</>;
};

export default WishlistInitializer;
