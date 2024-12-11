import React, { useState } from "react";
import LoginHeader from "../../layout/loginHeader/LoginHeader";

const SignupPage: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  return (
    <div className="px-6 py-[12px]">
      <LoginHeader />
      <h1 className="mb-4 font-semibold text-[32px] text-center">
        Lets Create An Account
      </h1>
      <form className="grid gap-[24px]">
        <div
          className="flex w-full h-9 items-center gap-1 bg-[#FAFAFA] p-[13px] rounded"
          id="userName"
        >
          <img src="../../../src/assets/icons/user.svg" alt="user" />
          <input
            className="bg-transparent w-full h-9 outline-none"
            type="text"
            placeholder="Username"
            name="user"
          />
        </div>
        <div
          className="flex w-full h-9 items-center gap-1 bg-[#FAFAFA] p-[13px] rounded"
          id="email"
        >
          <img src="../../../src/assets/icons/email.svg" alt="email" />
          <input
            className="bg-transparent w-full h-9 outline-none"
            type="text"
            placeholder="Email"
            name="email"
          />
        </div>
        <div className="flex"></div>
        <div
          className="flex w-full h-9 items-center gap-1 bg-[#FAFAFA] p-[13px] rounded"
          id="password"
        >
          <img src="../../../src/assets/icons/lock.svg" alt="pass" />
          <input
            className="bg-transparent w-full h-9 outline-none"
            placeholder="Password"
            name="pass"
            type={isPasswordVisible ? "text" : "password"}
          />
          <img
            src="../../../src/assets/icons/eye.svg"
            alt="toggle visibility"
            className="cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        </div>
        <div
          className="flex w-full h-9 items-center gap-1 bg-[#FAFAFA] p-[13px] rounded"
          id="confirmPassword"
        >
          <img src="../../../src/assets/icons/lock.svg" alt="pass" />
          <input
            className="bg-transparent w-full h-9 outline-none"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPass"
          />
          <img
            src="../../../src/assets/icons/eye.svg"
            alt="toggle visibility"
            className="cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
