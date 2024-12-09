import React from "react";
import Back from "../header.tsx/back";

const LoginHeader: React.FC = () => {
  return (
    <>
      <Back address="/" />
      <div className="mt-[76px] mb-[118px] grid justify-center items-center">
        <img src="../../../src/assets/icons/black-logo.svg" alt="Logo" />
      </div>
      <h1 className="text-center font-semibold text-[32px] text-black">
        Login to Your Account
      </h1>
    </>
  );
};
export default LoginHeader;
