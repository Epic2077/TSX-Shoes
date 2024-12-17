import React from "react";
import Back from "../../components/Auth-components/header.tsx/back";

const LoginHeader: React.FC = () => {
  return (
    <>
      <Back />
      <div className="mt-[76px] mb-[52px] grid justify-center items-center">
        <img src="../../../src/assets/icons/black-logo.svg" alt="Logo" />
      </div>
    </>
  );
};
export default LoginHeader;
