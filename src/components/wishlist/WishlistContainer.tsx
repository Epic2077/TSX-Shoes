import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useProducts } from "../../api/Query";
import { Product } from "../../types/Product.type";
import ProductWishlist from "./wishlist-Products";
import { BASE_URL } from "../../api/Base";

interface RootState {
  auth: {
    token: string;
  };
}

interface Props {
  products?: Product[];
}

const WishlistContainer = ({ products: propProducts }: Props) => {
  const accessToken = useSelector((state: RootState) => state.auth.token);
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true); // اضافه شده: وضعیت بارگذاری
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/wishlist`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setWishlistProducts(response.data);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching wishlist products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [accessToken]);

  const {
    products: apiProducts,
    isLoadingProducts,
    isErrorProducts,
  } = useProducts();

  const products = propProducts || wishlistProducts || apiProducts;

  if (isLoading || isLoadingProducts) return <div>Loading...</div>;
  if (isError || isErrorProducts) return <div>Error loading products.</div>;
  if (!products || products.length === 0) return <div>No products found.</div>;

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      {products.map((product) => (
        <ProductWishlist key={product.id} product={product} />
      ))}
    </div>
  );
};

export default WishlistContainer;
