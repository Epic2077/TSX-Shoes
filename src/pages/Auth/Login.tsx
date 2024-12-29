import React, { useRef, useState } from "react";
import { handleChange } from "../../components/Auth-components/loginFunction/FormHandler";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/UserAuth";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState<{ username?: string; password?: string }>(
    {}
  );
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const usernameInputRef = useRef<HTMLInputElement>(null);
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

  const validateForm = (): boolean => {
    let isValid = true;
    const errors: { username?: string; password?: string } = {};

    if (!formData.username) {
      errors.username = "Username is required";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //prevent default form submission

    if (!validateForm()) {
      return;
    }

    try {
      // Call API to Login
      const { accessToken } = await loginUser(
        formData.username,
        formData.password
      );

      const storage = document.getElementById("remember")?.checked
        ? localStorage
        : sessionStorage;

      storage.setItem("user", formData.username);
      storage.setItem("accessToken", accessToken);

      navigate("/Home");
    } catch (err: any) {
      //Handle Errors

      if (err.message === "Invalid credentials") {
        setError((prev) => ({
          ...prev,
          username: "Invalid credentials",
          password: "Invalid credentials",
        }));
      } else {
        console.error("An unexpected error occurred: ", err);
      }
    }
  };
  return (
    <div className="px-6 py-[67px]">
      <h1 className="text-center font-semibold text-[32px] text-black">
        Login to Your Account
      </h1>
      <form action="" className="mt-11" onSubmit={handleSubmit}>
        {/* username Input */}
        <div className="mb-4">
          <div
            className="w-full h-[37px] bg-[#FAFAFA] flex p-[13px] items-center rounded mb-[21px]"
            onFocus={() => handleFocus(usernameInputRef)}
            onBlur={() => handleBlur(usernameInputRef)}
            ref={usernameInputRef}
          >
            <img src="../../../src/assets/icons/email.svg" alt="username" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) =>
                handleChange(e, setFormData, setError, setIsButtonEnabled)
              }
              className="p-[4px] bg-transparent h-[24px] w-full outline-none"
              placeholder="Username"
            />
          </div>
          {error.username && (
            <p className="text-[#C50A0A] text-sm mt-1">{error.username}</p>
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
            <p className="text-[#C50A0A] text-sm mt-1">{error.password}</p>
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
          <p
            className="text-base cursor-pointer"
            onClick={() => navigate("/Auth/Forgot")}
          >
            Forgot Password?
          </p>
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
            <p
              className="text-base cursor-pointer"
              onClick={() => navigate("/Auth/Signup")}
            >
              Register Now
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
