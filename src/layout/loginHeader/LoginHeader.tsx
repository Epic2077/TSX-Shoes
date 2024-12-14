import React from "react";
import Back from "../../components/header.tsx/back";

interface HeaderProps {
  address: string;
}

const LoginHeader: React.FC<HeaderProps> = ({ address }) => {
  return (
    <>
      <Back address={`/${address}`} />
      <div className="mt-[76px] mb-[118px] grid justify-center items-center">
        <img src="../../../src/assets/icons/black-logo.svg" alt="Logo" />
      </div>
    </>
  );
};
export default LoginHeader;
