import React, { useState } from "react";
import { Slides } from "../../components/slides/slide";
import { useNavigate } from "react-router-dom";

interface boardingProps {
  setPage: (value: number) => void;
}

const Boarding: React.FC<boardingProps> = () => {
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    if (currentSlide < Slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      navigate("/Login");
    }
  };

  const boardingContainer = (
    <div className="flex flex-col items-center">
      <img
        src={Slides[currentSlide].imageSrc}
        alt={`Slide ${currentSlide + 1}`}
        className="w-full h-[657px] mt-[-55px]"
      />
      <h1 className="font-semibold text-[32px] text-center text-black mt-8 w-[380px]">
        {Slides[currentSlide].text}
      </h1>
      <div className="flex gap-[6px] absolute bottom-0 mb-[119px]">
        {Slides.map((_, index) => (
          <div
            key={index}
            className={`w-[30px] h-[3px] bg-black ${
              currentSlide === index ? "opacity-100" : "opacity-50"
            }`}
          ></div>
        ))}
      </div>
      <button
        className="absolute bottom-0 mb-8 px-4 py-2 w-[380px] h-[47px] grid items-center justify-center bg-black text-white rounded-full"
        onClick={handleNextSlide}
      >
        {currentSlide === Slides.length - 1 ? "Get Started!" : "Next"}
      </button>
    </div>
  );

  return boardingContainer;
};
export default Boarding;
