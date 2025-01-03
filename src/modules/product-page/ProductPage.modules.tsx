import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../../api/Query";
import ProductDetails from "./ProductDetails.modules";
import ProductQuantity from "./ProductQuantity.modules";
import HomeFooter from "../../components/home-components/footer/Footer";
import ProductTotalPrice from "./ProductTotalPrice.modules";
import ProductButton from "./ProductButton.modules";
import { LoadingSpinner } from "../../components/loading-spinner/loading";
import WishlistEvent from "../../components/wishlist/wishlist-event";
import ProductImages from "./ProductImages.modules";
import { useMutation } from "react-query";
import { addToCart } from "../../pages/cart/AddToCart";
import { CartItem } from "../../types/CartItem.type";

// ======== Error Component ========
const ErrorComponent = ({ message }: { message: string }) => (
  <div className="w-full flex justify-center items-center my-40">
    <p className="text-red-500 text-lg font-semibold">{message}</p>
  </div>
);

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isError, isLoading } = useProduct(id);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const { mutate, isLoading: isMutating } = useMutation({
    mutationFn: (newCart: CartItem) => addToCart(newCart),
  });

  if (isLoadingProduct) return <LoadingSpinner />;
  if (isErrorProduct)
    return <ErrorComponent message="Error loading product." />;
  if (!product) return <ErrorComponent message="No product found." />;

  const handleCartMutation = () => {
    const newCartItem = {
      productId: product.id,
      count: 1,
      size: selectedSize,
      color: selectedColor,
    };

    mutate(newCartItem, {
      onSuccess: (data) => console.log("Item added to cart", data),
      onError: (error) => console.error("Error adding item to cart", error),
    });
  };

  return (
    <>
      {/* ======== Product Image ======== */}
      <ProductImages images={product.images} />

      {/* ======== Product Details ======== */}
      <div className="px-6 py-3">
        {/*====== Title and Wishlist ==========*/}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#152536]">{product.name}</h1>
          <div className="w-7 h-7 cursor-pointer">
            <WishlistEvent product={product} />
          </div>
        </div>

        {/*========== Product Stats ==========*/}
        <div className="flex items-center justify-start gap-4 py-3 border-b-2 border-[#ECECEC]">
          <div className="bg-[#ECECEC] rounded-lg py-1 px-2">
            <p className="font-normal text-base text-[#152536]">
              {product.sold_quantity} sold
            </p>
          </div>
          <div className="flex items-center gap-2">
            <img src="/src/assets/icons/star.svg" alt="star-icon" />
            <p className="font-medium text-base text-[#68717A]">
              {product.rating} {product.view_count}
            </p>
          </div>
        </div>

        {/*========= Description =========*/}
        <div className="flex flex-col items-start gap-1 mt-1">
          <h2 className="text-2xl font-bold text-[#152536]">Description</h2>
          <p className="text-base font-normal text-[#68717A]">
            In ultricies fermentum aliquet. Pellentesque dui magna, condimentum
            non ullamcorp{" "}
            <span className="font-bold text-[#152536] cursor-pointer">
              view more...
            </span>
          </p>
        </div>

        {/* ======== Product Color & Size ======== */}
        <ProductDetails
          product={product}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />

        {/* ======== Product Quantity ======== */}
        <ProductQuantity
          product={product || { id: 0, title: "", images: [] }}
        />

        {/* ======== Price and Add to Cart ======== */}
        <div className="flex items-center justify-around my-2 pb-1 w-full">
          <ProductTotalPrice product={product} />

          {/* ======= Add To cart ======= */}
          <ProductButton
            product={product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            onClick={handleCartMutation}
            isLoading={isMutating}
          />
        </div>

        {/* ======== Footer ======== */}
        <HomeFooter />
      </div>
    </>
  );
};

export default ProductPage;
