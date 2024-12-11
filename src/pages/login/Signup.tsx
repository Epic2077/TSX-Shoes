import React from "react";
import LoginHeader from "../../layout/loginHeader/LoginHeader";

const SignupPage: React.FC = () => {
  return (
    <div className="px-6 py-[12px]">
      <LoginHeader />
      <h1 className="">Lets Create An Account</h1>
      <div className="grid gap-[24px]">
        <div
          className="flex w-full h-9 items-center gap-1 bg-[#FAFAFA]"
          id="userName"
        >
          <img src="../../../src/assets/icons/user.svg" alt="user" />
          <input type="text" />
        </div>
        <div
          className="flex w-full h-9 items-center gap-1 bg-[#FAFAFA]"
          id="email"
        ></div>
        <div className="flex"></div>
        <div
          className="flex w-full h-9 items-center gap-1 bg-[#FAFAFA]"
          id="password"
        ></div>
        <div
          className="flex w-full h-9 items-center gap-1 bg-[#FAFAFA]"
          id="confirmPassword"
        ></div>
      </div>
    </div>
  );
};

export default SignupPage;
