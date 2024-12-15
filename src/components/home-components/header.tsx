import React from "react";

const HomeHeader: React.FC = () => {
  return (
    <header className="flex">
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-black flex justify-center items-center rounded-full">
          <img
            src="../../../src/assets/Images/pfp.png"
            alt="pfp"
            className="w-full h-full rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
