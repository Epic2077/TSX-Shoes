import React, { useRef, useState } from "react";
import Back from "../../layout/header.tsx/back";

const LoginPage: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleFocus = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.classList.add("border-2", "border-black");
    }
  };

  const handleBlur = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.classList.remove("border-2", "border-black");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="px-6 py-[12px]">
      <Back address="/" />
      <div className="mt-[76px] mb-[118px] grid justify-center items-center">
        <img src="../../../src/assets/icons/black-logo.svg" alt="Logo" />
      </div>
      <h1 className="text-center font-semibold text-[32px] text-black">
        Login to Your Account
      </h1>
      <form action="" className="mt-11">
        {/* Email Input */}
        <div
          className="w-full h-[37px] bg-[#FAFAFA] flex p-[13px] items-center rounded mb-[21px]"
          onFocus={() => handleFocus(emailInputRef)}
          onBlur={() => handleBlur(emailInputRef)}
          ref={emailInputRef}
        >
          <img src="../../../src/assets/icons/email.svg" alt="email" />
          <input
            type="email"
            name="email"
            className="p-[4px] bg-transparent h-[24px] w-full outline-none"
            placeholder="Email"
          />
        </div>

        {/* Password Input */}
        <div
          className="w-full h-[37px] bg-[#FAFAFA] flex p-[13px] items-center rounded"
          onFocus={() => handleFocus(passwordInputRef)}
          onBlur={() => handleBlur(passwordInputRef)}
          ref={passwordInputRef}
        >
          <img src="../../../src/assets/icons/lock.svg" alt="pass" />
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            className="p-[4px] bg-transparent h-[24px] w-full outline-none"
            placeholder="Password"
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

export default LoginPage;
