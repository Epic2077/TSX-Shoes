import React, { useRef, useState } from "react";
import { Input } from "../loginInput/input";
import { useNavigate } from "react-router-dom";
import { handleChange, handleSubmit } from "../loginFunction/FormHandler";

const FormLayout: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <form
      className=""
      onSubmit={(e) => handleSubmit(e, formData, setError, "Signup")}
    >
      <Input
        icon="user"
        placeholder="Username"
        name="user"
        type="text"
        id="userName"
        onChange={(e) =>
          handleChange(e, setFormData, setError, setIsButtonEnabled)
        }
      />
      {error.username && (
        <p className="text-[#C50A0A] text-sm">{error.username}</p>
      )}
      <Input
        icon="email"
        placeholder="Email"
        name="email"
        type="email"
        id="email"
      />
      <div className="flex gap-[12px]">
        <Input
          icon="user"
          placeholder="First name"
          name="firstName"
          type="text"
          id="FirstName"
        />
        <Input
          icon="user"
          placeholder="Last name"
          name="lastName"
          type="text"
          id="lastName"
        />
      </div>
      <Input
        icon="lock"
        placeholder="Password"
        name="pass"
        type={isPasswordVisible ? "text" : "password"}
        id="password"
        customChildren={
          <img
            src="../../../src/assets/icons/eye.svg"
            alt="toggle visibility"
            className="cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        }
      />
      <Input
        icon="lock"
        placeholder="Confirm Password"
        name="confirmPass"
        type={isPasswordVisible ? "text" : "password"}
        id="confirmPassword"
        customChildren={
          <img
            src="../../../src/assets/icons/eye.svg"
            alt="toggle visibility"
            className="cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        }
      />
      <div className="flex gap-2">
        <div className="min-w-[115px] h-[37px] bg-[#FAFAFA] text-[#6C757D] px-[12px] flex items-center gap-1 rounded">
          <img src="../../../src/assets/icons/gender.svg" alt="gender" />
          <select
            name="gender"
            id="gender"
            className="bg-transparent w-full text-[14px]"
          >
            <option value="gender">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <Input
          icon="phone"
          placeholder="Phone Number"
          name="phone"
          type="text"
          id="phone"
        />
      </div>
      <div className="flex gap-2 w-full items-start">
        <input
          type="checkbox"
          name="policy"
          id="policy"
          className="accent-black mt-[6px]"
        />
        <label htmlFor="policy">
          I have read and accept the User Aggrement and Privacy Policy.
        </label>
      </div>
      <div className="absolute bottom-0 grid justify-center mb-4">
        <button
          name="submit"
          id="submit"
          type="submit"
          className={`bg-black text-white cursor-pointer grid justify-center items-center w-[380px] h-12 rounded-full mb-5`}
        >
          Sign Up
        </button>
        <div className="flex justify-center gap-5">
          <p className="text-base opacity-50">Have an account?</p>
          <p
            className="text-base cursor-pointer"
            onClick={() => navigate("/Auth/Login")}
          >
            Login Now
          </p>
        </div>
      </div>
    </form>
  );
};
export default FormLayout;
