import React from "react";
import Back from "../header.tsx/back";

const LoginHeader: React.FC = () => {
  return (
    <>
      <Back address="/" />
      <div className="mt-[76px] mb-[118px] grid justify-center items-center">
        <img src="../../../src/assets/icons/black-logo.svg" alt="Logo" />
      </div>
    </>
  );
};
export default LoginHeader;
