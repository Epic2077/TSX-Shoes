import { Product } from "../../types/Product.type";
import { Flip, toast, ToastContainer } from "react-toastify";

type Props = {
  product: Product;
  selectedSize: number | null;
  selectedColor: string | null;
  onClick: () => void;
  isLoading: boolean;
};

const ProductButton = ({
  selectedSize,
  selectedColor,
  onClick,
  isLoading,
}: Props) => {
  //   ======== React Toastify ==========

  const notifyA = () => {
    toast.success("Product Added to Cart Successfully", {
      position: "bottom-center",
      autoClose: 3000,
      containerId: "A",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });
  };

  const notifyB = () => {
    toast.warn("Please Select Size and Color !", {
      position: "bottom-center",
      autoClose: 3000,
      containerId: "B",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });
  };

  // =========== Handlers ============

  const handleAddToCart = () => {
    if (selectedSize === null || selectedColor === null) {
      notifyB();
      return;
    }
    onClick();
    notifyA();
  };

  return (
    <>
      <button
        className="flex items-center justify-center text rounded-full px-10 py-3 gap-3 bg-[#152536] ml-auto"
        onClick={handleAddToCart}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="text-white w-6 h-6">Adding...</span>
        ) : (
          <>
            <div className="w-6 h-6">
              <img
                src="/src/assets/icons/basket-white.svg"
                alt="basket-icon"
                className="w-full h-full"
              />
            </div>
            <p className="text-2xl font-normal text-white">Add to Cart</p>
          </>
        )}
      </button>
      <ToastContainer containerId="A" />
      <ToastContainer containerId="B" />
    </>
  );
};

export default ProductButton;
