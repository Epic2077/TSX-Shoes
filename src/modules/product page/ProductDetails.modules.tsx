import { Dispatch, SetStateAction } from "react";
import { Product } from "../../types/Product.type";

interface Props {
  product: Product;
  selectedSize: number | null;
  selectedColor: string | null;
  setSelectedSize: Dispatch<SetStateAction<number | null>>;
  setSelectedColor: Dispatch<SetStateAction<string | null>>;
}

const ProductDetails = ({
  product,
  selectedSize,
  selectedColor,
  setSelectedSize,
  setSelectedColor,
}: Props) => {
  const colorClasses: { [key: string]: string } = {
    rose: "bg-rose-700",
    emerald: "bg-emerald-700",
    red: "bg-red-700",
    gray: "bg-gray-700",
    teal: "bg-teal-700",
  };

  return (
    <div className="flex items-center justify-between gap-6 py-4">
      {/* ======== Set Size ======== */}
      <div className="flex flex-col items-start gap-3">
        <p className="font-bold text-[#152536] text-xl">Size</p>
        <div className="flex items-center justify-start gap-2">
          {product.size.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-10 h-10 border-2 rounded-full flex items-center justify-center ${
                selectedSize === size
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-400 hover:bg-black hover:text-white"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* ======== Set Color ======== */}
      <div className="flex flex-col items-start justify-start gap-3">
        <p className="font-bold text-[#152536] text-xl">Color</p>
        <div className="flex items-center justify-start gap-2">
          {product.color.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-10 h-10 border-2 rounded-full ${
                selectedColor === color
                  ? "border-gray-400 ring-2 ring-gray-400"
                  : "border-gray-400 hover:ring-2 hover:ring-gray-400"
              } ${colorClasses[color] || "bg-gray-300"}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
