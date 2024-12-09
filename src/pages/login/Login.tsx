import React, { useRef, useState } from "react";
import Back from "../../layout/header.tsx/back";
import {
  handleChange,
  handleSubmit,
} from "../../components/loginFunction/FormHandler";
import LoginHeader from "../../layout/loginHeader/LoginHeader";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<{ email?: string; password?: string }>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

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
      <LoginHeader />
      <h1 className="text-center font-semibold text-[32px] text-black">
        Login to Your Account
      </h1>
      <form
        action=""
        className="mt-11"
        onSubmit={(e) => handleSubmit(e, formData, setError)}
      >
        {/* Email Input */}
        <div className="mb-4">
          <div
            className="w-full h-[37px] bg-[#FAFAFA] flex p-[13px] items-center rounded mb-[21px]"
            onFocus={() => handleFocus(emailInputRef)}
            onBlur={() => handleBlur(emailInputRef)}
            ref={emailInputRef}
          >
            <img src="../../../src/assets/icons/email.svg" alt="email" />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={(e) =>
                handleChange(e, setFormData, setError, setIsButtonEnabled)
              }
              className="p-[4px] bg-transparent h-[24px] w-full outline-none"
              placeholder="Email"
            />
          </div>
          {error.email && (
            <p className="text-red-500 text-sm mt-1">{error.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4">
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
              value={formData.password}
              onChange={(e) =>
                handleChange(e, setFormData, setError, setIsButtonEnabled)
              }
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
          {error.password && (
            <p className="text-red-500 text-sm mt-1">{error.password}</p>
          )}
        </div>
        <div className="flex justify-between w-full mt-[21px]">
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className="accent-black rounded"
            />
            <label htmlFor="remember" className="text-base font-normal">
              Remember me
            </label>
          </div>
          <p className="text-base">Forgot Password?</p>
        </div>
        <div className="absolute bottom-0 grid justify-center mb-4">
          <button
            name="submit"
            id="submit"
            type="submit"
            disabled={!isButtonEnabled}
            className={`${
              isButtonEnabled
                ? "bg-black text-white cursor-pointer"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            } grid justify-center items-center w-[380px] h-12 rounded-full mb-5`}
          >
            Sign In
          </button>
          <div className="flex justify-center gap-5">
            <p className="text-base opacity-50">Don't have an account?</p>
            <p className="text-base">Register Now</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
