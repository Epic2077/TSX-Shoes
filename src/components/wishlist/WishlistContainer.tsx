import { useEffect, useState } from "react"; // اضافه شده: برای مدیریت وضعیت و بارگذاری
import { useSelector } from "react-redux"; // اضافه شده: برای دسترسی به توکن
import axios from "axios"; // اضافه شده: برای ارسال درخواست‌های HTTP
import { useProducts } from "../../api/Query"; // حفظ شده: برای استفاده از محصولات API
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
  const accessToken = useSelector((state: RootState) => state.auth.token); // Specify the type for state
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]); // اضافه شده: وضعیت برای محصولات ویند لیست
  const [isLoading, setIsLoading] = useState(true); // اضافه شده: وضعیت بارگذاری
  const [isError, setIsError] = useState(false); // اضافه شده: وضعیت خطا

  // بارگذاری محصولات ویند لیست
  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/wishlist`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setWishlistProducts(response.data); // Use setWishlistProducts to update state
      } catch (error: any) {
        setIsError(true);
        console.error("Error fetching wishlist products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlistProducts(); // فراخوانی تابع برای بارگذاری محصولات
  }, [accessToken]); // وابستگی به accessToken

  const {
    data: apiProducts,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useProducts();

  const products = propProducts || wishlistProducts || apiProducts; // Use wishlistProducts in rendering

  if (isLoading || isLoadingProducts) return <div>Loading...</div>; // نمایش پیام بارگذاری
  if (isError || isErrorProducts) return <div>Error loading products.</div>; // نمایش پیام خطا
  if (!products || products.length === 0) return <div>No products found.</div>; // نمایش پیام در صورت عدم وجود محصول

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      {products.map((product) => (
        <ProductWishlist key={product.id} product={product} /> // نمایش هر محصول
      ))}
    </div>
  );
};

export default WishlistContainer;
