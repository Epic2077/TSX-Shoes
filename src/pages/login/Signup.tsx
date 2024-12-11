import React, { useState } from "react";
import LoginHeader from "../../layout/loginHeader/LoginHeader";
import { Input } from "../../layout/loginInput/input";

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
        <Input
          icon="user"
          placeholder="Username"
          name="user"
          type="text"
          id="userName"
        />
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
      </form>
    </div>
  );
};

export default SignupPage;
