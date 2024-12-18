import React, { useRef, useState } from "react";
import {
  handleChange,
  handleSubmit,
} from "../../components/Auth-components/loginFunction/FormHandler";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../api/users";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

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

  const validateForm = (): boolean => {
    let isValid = true;
    let errors: { email?: string; password?: string } = {};

    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handleLogin = async (
    e: React.FormEvent,
    formData: any,
    setError: any
  ) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm(formData, setError)) {
      return;
    }

    const { email, password } = formData;

    try {
      // Authenticate the user
      const user = await authenticateUser(email, password);

      // Handle successful login (store user data, navigate, etc.)
      const storage = document.getElementById("remember")?.checked
        ? localStorage
        : sessionStorage;

      storage?.setItem("user", JSON.stringify(user));

      // Redirect to the homepage or other route
      navigate("/Home");
    } catch (err: any) {
      if (err.message === "Email not found") {
        setError({ ...error, email: "Email not found" });
      } else if (err.message === "Incorrect password") {
        setError({ ...error, password: "Incorrect password" });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission

    // Directly call handleLogin and pass the necessary arguments
    handleLogin(e, formData, setError);
  };
  return (
    <div className="px-6 py-[67px]">
      <h1 className="text-center font-semibold text-[32px] text-black">
        Login to Your Account
      </h1>
      <form action="" className="mt-11" onSubmit={handleSubmit}>
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
            <p className="text-[#C50A0A] text-sm mt-1">{error.email}</p>
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
