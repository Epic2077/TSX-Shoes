// import axios, { AxiosError } from "axios";
// import { useSelector } from "react-redux";
// import { BASE_URL } from "../../api/Base";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// interface RootState {
//   auth: {
//     token: string;
//   };
// }
// interface ProductPageProps {
//   product: {
//     id: string;
//   };
// }

// const WishlistEvent = ({ product }: ProductPageProps) => {
//   const [isInWishlist, setIsInWishlist] = useState(false);
//   const accessToken = useSelector((state: RootState) => state.auth.token);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkWishlistStatus = async () => {
//       if (!accessToken) return;

//       try {
//         const response = await axios.get(
//           `${BASE_URL}/api/wishlist?search=${product.id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );
//         setIsInWishlist(response.data.length > 0);
//       } catch (error) {
//         console.error("Error checking wishlist status:", error);
//       }
//     };

//     checkWishlistStatus();
//   }, [product.id, accessToken]);

//   const toggleWishlist = async () => {
//     if (!accessToken) {
//       const wantsToLogin = window.confirm(
//         "You need to be logged in to manage your wishlist. Would you like to log in?"
//       );

//       if (wantsToLogin) {
//         navigate("/auth/login");
//       }
//       return;
//     }

//     try {
//       if (isInWishlist) {
//         await axios.delete(`${BASE_URL}/Api/Wishlist/${product.id}`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         console.log("Product removed from wishlist.");
//         setIsInWishlist(false);
//       } else {
//         await axios.post(
//           `${BASE_URL}/Api/Wishlist`,
//           { productId: product.id },
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );
//         console.log("Product added to wishlist.");
//         setIsInWishlist(true);
//       }
//     } catch (error: unknown) {
//       const err = error as AxiosError;
//       if (err.response?.status === 401) {
//         console.error("Unauthorized: Access token may be invalid or expired.");
//       } else {
//         console.error("Error toggling wishlist status:", error);
//       }
//     }
//   };

//   return (
//     <div className="w-7 h-7 cursor-pointer" onClick={toggleWishlist}>
//       <img
//         src={
//           isInWishlist
//             ? "../../../src/assets/icons/heart-filled.svg"
//             : "../../../src/assets/icons/heart.svg"
//         }
//         alt="wishlist-icon"
//         className="w-full h-full"
//       />
//     </div>
//   );
// };

// export default WishlistEvent;


import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../store/slices/WishListSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../api/Base";

interface ProductPageProps {
  product: {
    id: string;
  };
}

const WishlistEvent = ({ product }: ProductPageProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.token);
  const wishlist = useSelector((state: RootState) => state.wishList.items);

  const isInWishlist = wishlist.includes(product.id);

  const toggleWishlist = async () => {
    if (!accessToken) {
      const wantsToLogin = console.log(
        "You need to be logged in to manage your wishlist. Would you like to log in?"
      );
      if (wantsToLogin) {
        navigate("/auth/login");
      }
      return;
    }

    try {
      if (isInWishlist) {
        await axios.delete(`${BASE_URL}/Api/Wishlist/${product.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        dispatch(removeFromWishlist(product.id));
      } else {
        await axios.post(
          `${BASE_URL}/Api/Wishlist`,
          { productId: product.id },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        dispatch(addToWishlist(product.id));
      }
    } catch (error) {
      console.error("Error toggling wishlist status:", error);
    }
  };

  return (
    <div className="w-7 h-7 cursor-pointer" onClick={toggleWishlist}>
      <img
        src={
          isInWishlist
            ? "../../../src/assets/icons/heart-filled.svg"
            : "../../../src/assets/icons/heart.svg"
        }
        alt="wishlist-icon"
        className="w-full h-full"
      />
    </div>
  );
};

export default WishlistEvent;

