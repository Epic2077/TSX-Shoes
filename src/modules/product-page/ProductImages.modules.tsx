import { useState } from "react";
import Back from "../../components/Auth-components/header/back";

interface ProductImagesProps {
  images: string[];
}

const ProductImages = ({ images }: ProductImagesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ======= Handlers ==============

  const handleNext = () => {
    setCurrentIndex((pervIndex) => (pervIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((pervIndex) =>
      pervIndex === 0 ? images.length - 1 : pervIndex - 1
    );
  };

  return (
    <div className="w-full h-96 relative">
      <div className="absolute top-5 left-6">
        <Back />
      </div>
      <img
        src={images[currentIndex]}
        alt={ProductImages.name}
        className="w-full h-full object-cover"
      />
      <div className=" w-full flex bg-transparent items-center justify-between px-3 top-1/2 absolute">
        <button
          className="rounded-full w-8 h-8 bg-slate-600 flex justify-center items-center"
          onClick={handlePrevious}
        >
          <img src="/src/assets/icons/previous-image.svg" alt="" />
        </button>

        <button
          className="rounded-full w-8 h-8 bg-slate-600 flex justify-center items-center"
          onClick={handleNext}
        >
          <img src="/src/assets/icons/next-image.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default ProductImages;
