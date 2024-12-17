import React from "react";

interface LoadingProps {
  setPage: (value: number) => void;
}

const Loading: React.FC<LoadingProps> = ({ setPage }) => {
  setTimeout(() => {
    setPage(1);
  }, 3000);

  return (
    <div className="w-[428px] min-h-[926px] flex flex-col bg-slate-100 justify-center items-center">
      <div className="flex gap-4 items-center mb-[79px]">
        <div className="w-[59px] h-[59px] grid justify-center items-center bg-black rounded-full">
          <img
            src="../../../src/assets/icons/white-logo.svg"
            alt="white-logo"
          />
        </div>
        <h1 className="text-black text-[52px] font-bold">Shoea</h1>
      </div>
      <img
        src="../../../src/assets/icons/spinner-atom.svg"
        alt="spinner"
        className="animate-spin absolute bottom-0 mb-[117px]"
      />
    </div>
  );
};
export default Loading;
