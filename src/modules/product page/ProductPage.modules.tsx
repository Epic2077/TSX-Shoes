import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../../api/Query";
import Back from "../../components/Auth-components/header.tsx/back";
import ProductDetails from "./ProductDetails.modules";
import ProductQuantity from "./ProductQuantity.modules";
import HomeFooter from "../../components/home-components/footer/Footer";
import ProductTotalPrice from "./ProductTotalPrice.modules";
import ProductButton from "./ProductButton.modules";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { product, isErrorProduct, isLoadingProduct } = useProduct(Number(id));
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  if (isLoadingProduct)
    return (
      <div className="w-full flex justify-center my-40">
        <img
          src="../../../../../src/assets/icons/spinner-atom.svg"
          alt="loading"
          className="animate-spin"
        />
      </div>
    );
  if (isErrorProduct) return <div>Error loading product.</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <>
      {/* ==== product Img ========= */}
      <div className="w-full h-96">
        <img
          src={product.images}
          alt={product.title}
          className="w-full h-full"
        />
      </div>
      <div className="absolute top-5 left-6">
        <Back />
      </div>
      {/* ==== product Title & description ========= */}
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#152536]">{product.title}</h1>
          <div className="w-7 h-7">
            <img
              src="/src/assets/icons/heart.svg"
              alt="add-to-wishlist"
              className="w-full h-full cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center justify-start gap-4 py-3 border-b-2 border-[#ECECEC]">
          <div className="bg-[#ECECEC] rounded-lg py-1 px-2 w-fit">
            <p className="font-normal text-base text-[#152536]">5/765 sold</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div>
              <img src="/src/assets/icons/star.svg" alt="star-icon" />
            </div>
            <p className="font-medium text-base text-[#68717A]">
              4.3 (5800 reviews)
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-1 mt-1">
          <h2 className="text-2xl font-bold text-[#152536]">Description</h2>
          <p className="text-base font-normal text-[#68717A]">
            In ultricies fermentum aliquet. Pellentesque dui magna, condimentum
            non ullamcorp{" "}
            <span className="font-bold text-[#152536]">view more...</span>
          </p>
        </div>

        {/* ==== product Color & Size ========= */}
        <ProductDetails
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          setSelectedSize={setSelectedSize}
          setSelectedColor={setSelectedColor}
        />

        {/* ======= Product Quantity */} 
        <ProductQuantity product={product} />

        {/* ======= Price And Add to cart button */}
        <div className="flex items-center justify-between mb-2 pb-1">
          <ProductTotalPrice product={product} />
          <ProductButton
            product={product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
          />
        </div>

        {/* ======= Footer ======= */}
        <HomeFooter />
      </div>
    </>
  );
};

export default ProductPage;
