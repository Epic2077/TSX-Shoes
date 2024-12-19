import React from "react";
import Back from "../../components/Auth-components/header.tsx/back";

interface LoginHeaderProps {
  address?: string;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ address }) => {
  return (
    <>
      <Back address={address} />
      <div className="mt-[76px] mb-[52px] grid justify-center items-center">
        <img src="../../../src/assets/icons/black-logo.svg" alt="Logo" />
      </div>
    </>
  );
};
export default LoginHeader;
