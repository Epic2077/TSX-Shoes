import React from "react";

interface WelcomeProps {
  setPage: (value: number) => void;
}

const WelcomePage: React.FC<WelcomeProps> = ({ setPage }) => {
  setTimeout(() => {
    setPage(2);
  }, 3000);
  return (
    <div className="w-[428px] min-h-[926px] bg-[url('../../../src/assets/images/welcome-image.png')] grid items-end">
      <img
        src="../../../src/assets/Images/dark-layer.png"
        alt="layer"
        className="w-[428px] h-[926px] absolute top-0"
      />
      <div className="pb-[74px] pl-6 z-10">
        <h2 className="font-semibold text-[40px] text-white mt-[-16px]">
          Welcome to 👋
        </h2>
        <h1 className="font-bold text-7xl text-white mb-7">Shoea</h1>
        <p className="font-semibold text-base text-white w-[364px]">
          The best sneakers & shoes e-commerce app of the century for your
          fashion needs!
        </p>
      </div>
    </div>
  );
};
export default WelcomePage;
