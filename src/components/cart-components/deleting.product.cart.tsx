import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { BASE_URL } from "../../api/Base";
import { Product } from "../../types/Product.type";
import { toast } from "react-toastify";

interface deleteProp {
  product: Product;
  deletingCart: boolean;
}

const deleteProductFromCart: React.FC<deleteProp> = ({
  product,
  deletingCart,
}) => {
  const accessToken = useSelector((state: RootState) => state.auth.token);

  const deleteFunc = async () => {
    if (!deletingCart) {
      console.log("Nothing changed");
      return;
    }

    if (!product || !product.id) {
      console.error("Invalid product data:", product);
      return;
    }

    try {
      console.log(`Deleting product ${product.id} from cart`);

      const response = await axios.delete(
        `${BASE_URL}/api/cart/${product.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Server response:", response);

      // Only reload and show toast if the delete was successful
      if (response.status === 200 || response.status === 204) {
        toast.success("Product successfully removed from cart!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Short delay to allow toast to be visible before reload
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error deleting product from cart:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        toast.error("Failed to remove product from cart");
      } else {
        console.error("Error deleting product from cart:", error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  React.useEffect(() => {
    deleteFunc().catch((error) => {
      console.error("Error in deleteFunc:", error);
    });
  }, []);

  return (
    <>
      <div className="w-screen h-screen bg-slate-700 opacity-50 absolute top-0 left-0 z-10"></div>
    </>
  );
};

export default deleteProductFromCart;
